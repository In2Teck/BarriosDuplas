class User < ActiveRecord::Base

  MILE_TO_KM = 1.609344

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model

  attr_accessible :email, :password, :password_confirmation, :remember_me, :facebook_id, :twitter_id, :first_name, :last_name, :roles, :access_token, :oauth_token, :oauth_token_secret, :facebook_hash, :twitter_hash, :last_twitt_id, :last_facebook_run, :hood_id, :kilometers, :age, :register_complete, :never_twitter

  has_and_belongs_to_many :roles
  has_many :runs
  has_many :invites
  has_one :first_user_team, class_name: "Team", foreign_key: "first_user_id"
  has_one :second_user_team, class_name: "Team", foreign_key: "second_user_id"
  belongs_to :hood

  after_create :verify_external_role_for_users_without_email

  #validates_presence_of :email, :password
  #
	def role?(role)
		return !!self.roles.find_by_name(role)
	end

  def verify_external_role_for_users_without_email
    if (not (self.email and self.password) and not self.role? :external)
      raise 'Usuario sin email y sin password que aparte no tiene rol externo'
    end
  end

  def password_required?
    false
  end

  def email_required?
    false
  end

  def email_changed?
    false
  end

  def self.search(search)
    if search
      where('email LIKE ?', "%#{search}%")
    else
      scoped
    end
  end

  def self.find_for_facebook_oauth(auth, signed_in_resource = nil)
		user = User.where(:email => auth.info.email).first
		if not user
			# CHECK FOR NEW/CREATE
      gender = auth.extra.raw_info.gender
      if gender == "male"
        return nil
      end
      age = self.calc_age auth.extra.raw_info.birthday
			user = User.create(first_name:auth.info.first_name, last_name:auth.info.last_name, facebook_id:auth.uid, email:auth.info.email, password:Devise.friendly_token[0,20], access_token:auth.credentials.token, facebook_hash:auth, last_facebook_run:Time.now, age:age)
    elsif (not user.access_token) or (user.access_token != auth.credentials.token)
      if user.encrypted_password.blank?
        user.update_attributes(:first_name => auth.info.first_name, :last_name => auth.info.last_name, :facebook_id => auth.uid, :password => Devise.friendly_token[0,20], :access_token => auth.credentials.token, :facebook_hash => auth, :last_facebook_run => Time.now, :roles => [])
      else
        user.update_attribute(:access_token, auth.credentials.token)
      end
		end
		user
	end

  def self.find_for_twitter_oauth(auth_hash, signed_in_resource = nil)
		user = User.find_by_twitter_id auth_hash.uid
		if (not user) and signed_in_resource
      user_twitter = Twitter::Client.new(
        :oauth_token => auth_hash.credentials.token,
        :oauth_token_secret => auth_hash.credentials.secret,
        :consumer_key => ENV['TWITTER_CONSUMER_KEY'],
        :consumer_secret => ENV['TWITTER_CONSUMER_SECRET'])
      last_twitt_id = user_twitter.user_timeline[0].id
			signed_in_resource.update_attributes({:twitter_id => auth_hash.uid, :oauth_token => auth_hash.credentials.token, :oauth_token_secret => auth_hash.credentials.secret, :twitter_hash => auth_hash, :last_twitt_id => last_twitt_id})
    elsif (not user.oauth_token) and (not user.oauth_token_secret) and signed_in_resource
      signed_in_resource.update_attributes({:oauth_token => auth_hash.credentials.token, :oauth_token_secret => auth_hash.credentials.secret})
		end
		user || signed_in_resource
	end

  def self.calc_age age_str
    age = age_str.split("/")
    birthday = DateTime.new(age[2].to_i, age[0].to_i, age[1].to_i)
    now = Time.now.utc.to_date
    now.year - birthday.year - ((now.month > birthday.month || (now.month == birthday.month && now.day >= birthday.day)) ? 0 : 1)
  end

  def self.update_runs
    users = User.all
    users.each do |user|
      if user.access_token
        user.save_fb_runs
      end
      if user.oauth_token
        user.save_tw_runs
      end
      user.save_total_kilometers
    end
    Team.validate_all_challenges
  end

  def query_fb_runs
    begin
      rg = RestGraph.new(:access_token => self.access_token)
      return rg.get('me/fitness.runs')
    rescue => error
      if error.error and error.error["error"] and [458, 460].index(error.error["error"]["error_subcode"])
        self.update_attribute(:access_token, nil)
        User.log_parse_error "User #{self.id} without FB permissions or with password changed, needs to log back in"
      else
        User.log_error self, error
      end
      return nil
    end
  end

  def save_fb_runs
    runs = self.query_fb_runs
    user_last_run = self.last_facebook_run || self.created_at
    if runs 
      runs["data"].each do |run|
        if not Run.find_by_run_id(URI.parse(run["data"]["course"]["url"]).path.split("/").last) and user_last_run < run["publish_time"] 
          begin
            fb_run = Run.new(:user_id => self.id, :run_url => run["data"]["course"]["url"], :run_id => URI.parse(run["data"]["course"]["url"]).path.split("/").last, :kilometers => distance_in_km_for_fb(run["data"]["course"]["title"]), :published_date => run["publish_time"], :start_date =>run["start_time"], :accounted => false)
            if fb_run.start_date and fb_run.start_date > DateTime.new(2014, 2, 04, 6, 0, 1)
              fb_run.save!
            else
              User.log_parse_error "Usuario #{self.id} intentando subir una carrera pasada run: #{fb_run.start_date.in_time_zone('Mexico City')}" if fb_run.start_date
            end
          rescue
            User.log_user_run self, run
          end
        end
      end
    end 
    self.update_attribute(:last_facebook_run, Time.now)
  end

  def query_tw
    begin
      ut = Twitter::Client.new(
        :oauth_token => self.oauth_token,
        :oauth_token_secret => self.oauth_token_secret,
        :consumer_key => ENV['TWITTER_CONSUMER_KEY'],
        :consumer_secret => ENV['TWITTER_CONSUMER_SECRET'])
      return ut.user_timeline(self.twitter_id.to_i, {:count => 200, :since_id => self.last_twitt_id.to_i})
    rescue => error
      if error.message == "Invalid or expired token"
        self.update_attributes({:oauth_token => nil, :oauth_token_secret => nil})
        User.log_parse_error "User #{self.id} without invalid TW token, needs to log back in"
      else
        User.log_error self, error
      end
      return nil
    end
  end

  def save_tw_runs
    twitts = self.query_tw
    if twitts
      twitts.each do |twitt|
        begin
          if twitt.attrs[:text].index("#nikeplus") and twitt.attrs[:text].index("http")
            original_url = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/.match(twitt.attrs[:text])[1]
            final_url = open(original_url, :allow_redirections => :all).base_uri.path
            if not Run.find_by_run_id(final_url.split("/").last)
              tw_run = Run.new(:user_id => self.id, :run_url => original_url, :run_id => final_url.split("/").last, :kilometers => distance_in_km_for_tw(twitt.attrs[:text].match("([0-9]*[.,][0-9]*[ ]*)(mi|km)")), :published_date => twitt.attrs[:created_at], :accounted => false)
              tw_run.save!
            end
          end
        rescue
          User.log_user_run self, twitt.to_yaml      
        end
      end
    end
    self.update_attribute(:last_twitt_id, twitts[0].id) if (twitts and not twitts.empty?)
  end

  def distance_in_km_for_fb distance_string
    distance = distance_string.split(" ")
    if distance[1] == "miles"
      return distance[0].to_f * MILE_TO_KM
    elsif distance[1] == "kilometers"
      return distance[0].to_f
    else
      User.log_parse_error "distance_string #{distance_string}"
      raise distance_string
    end
  end

  def distance_in_km_for_tw distance_exp
    if distance_exp[2] == "mi"
      return distance_exp[1].to_f * MILE_TO_KM
    else
      return distance_exp[1].to_f
    end
  end 

  def save_total_kilometers
    km = 0
    self.runs.where("accounted != ?", true).each do |run|
      km += run.kilometers
      run.update_attribute(:accounted, true)
      #TODO: UNLOCK CHALLENGES
     end
    self.update_attribute(:kilometers, (self.kilometers || 0) + km.round(2))
  
    #updating team kilometers    
    if self.first_user_team
      self.first_user_team.validate_and_update_kilometers(km.round(2))
    elsif self.second_user_team
      self.second_user_team.validate_and_update_kilometers(km.round(2))
    end

  end

  def self.runs_logger
    @@runs_logger ||= Logger.new(File.join(Rails.root, 'log', 'runs_log.log'))
  end

  def self.log_user_run current_user, run
    begin
      User.runs_logger.error("#{Time.now.in_time_zone('Central Time (US & Canada)').to_formatted_s(:short)} user: #{current_user.id}, run: #{run}")
    rescue
      logger.error "The custom try_logger is not working."
    end
  end

  def self.log_parse_error error
    begin
      User.runs_logger.error("#{Time.now.in_time_zone('Central Time (US & Canada)').to_formatted_s(:short)} error: #{error}")
    rescue
      logger.error "The custom try_logger is not working."
    end
  end

  def self.log_error current_user, error
    begin
      User.runs_logger.error("#{Time.now.in_time_zone('Central Time (US & Canada)').to_formatted_s(:short)} user: #{current_user.id}, error: #{error}\n backtrace: #{error.backtrace}")
    rescue
      logger.error "The custom try_logger is not working."
    end
  end

end

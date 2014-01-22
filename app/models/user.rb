class User < ActiveRecord::Base

  MILE_TO_KM = 1.609344

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  # Setup accessible (or protected) attributes for your model

  attr_accessible :email, :password, :password_confirmation, :remember_me, :facebook_id, :twitter_id, :first_name, :last_name, :roles, :access_token, :oauth_token, :oauth_token_secret, :facebook_hash, :twitter_hash, :last_twitt_id, :last_facebook_run, :hood_id, :kilometers, :age

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

  def self.find_for_facebook_oauth(auth, signed_in_resource = nil)
		user = User.where(:email => auth.info.email).first
		if not user
			# CHECK FOR NEW/CREATE
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

end

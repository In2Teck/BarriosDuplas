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

	def self.find_for_facebook_oauth(auth, signed_in_resource = nil)
		user = User.where(:email => auth.info.email).first
		unless user
			# CHECK FOR NEW/CREATE
			user = User.create(first_name:auth.info.first_name, last_name:auth.info.last_name, uid:auth.uid, email:auth.info.email, password:Devise.friendly_token[0,20])
		end
		user
	end

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

end

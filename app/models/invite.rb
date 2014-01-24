class Invite < ActiveRecord::Base
  attr_accessible :accepted, :invited_user_facebook_id, :invited_user_name, :user_id, :request_facebook_id

  belongs_to :user
	belongs_to :invited_user, :class_name => "User", :foreign_key => :invited_user_facebook_id, :primary_key => :facebook_id
end

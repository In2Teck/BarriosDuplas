class Team < ActiveRecord::Base
  attr_accessible :first_user_id, :kilometers, :name, :second_user_id

  belongs_to :first_user, class_name: "User", foreign_key: "first_user_id"
  belongs_to :second_user, class_name: "User", foreign_key: "second_user_id"
  has_many :participations
  has_many :challenges, through: :participations
end

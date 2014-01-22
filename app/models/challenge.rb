class Challenge < ActiveRecord::Base
  attr_accessible :name, :start_date

  has_many :participations
  has_many :teams, through: :participations
end

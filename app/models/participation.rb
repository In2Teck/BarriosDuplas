class Participation < ActiveRecord::Base
  attr_accessible :accomplished, :challenge_id, :register_number, :team_id

  belongs_to :team
  belongs_to :challenge
end

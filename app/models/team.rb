class Team < ActiveRecord::Base
  attr_accessible :first_user_id, :kilometers, :name, :second_user_id, :notify_author

  belongs_to :first_user, class_name: "User", foreign_key: "first_user_id"
  belongs_to :second_user, class_name: "User", foreign_key: "second_user_id"
  has_many :participations
  has_many :challenges, through: :participations

  def validate_and_update_kilometers km
    if self.first_user_id and self.second_user_id
      self.update_attribute(:kilometers, (self.kilometers || 0) + km)
    else
      User.log_parse_error "Team #{self.id} is missing one user, #{km} kilometers won't be accounted."
    end
  end

  def self.calculate_total_ranking
    Team.where("first_user_id is not null and second_user_id is not null and name is not null").order("kilometers DESC")
  end

  def calculate_self_ranking
    total_ranking = Team.where("first_user_id is not null and second_user_id is not null").order("kilometers DESC")
    position = total_ranking.index(self)
    return {:kilometers => self.kilometers, :position => (position > 0) ? (position + 1) : 0}
  end

  def completed_challenges
    challenges = {}
    self.participations.each do |participation|
      challenges[participation.challenge_id] = Challenge.find(participation.challenge_id)
    end 
  end

  def self.validate_all_challenges
    Team.all.each do |team|
      team.validate_challenges
    end
  end

  def validate_challenges
    Challenge.validate_all self
  end

end

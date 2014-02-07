class Challenge < ActiveRecord::Base
  attr_accessible :name, :start_date, :description, :image_url

  has_many :participations
  has_many :teams, through: :participations

  def self.validate_all team

    Challenge.all.each_with_index do |challenge, i|
      if not Participation.where("team_id = ? and challenge_id = ?", team.id, (i+1)).length > 0
        challenge.send("validate_#{i+1}", team.first_user, team.second_user)
      end
    end

  end

  def validate_1 u1, u2 
    #wake_up
    puts 'validate 1'
  end

  def validate_2 u1, u2 
    #supérense
    puts 'validate 2'
  end

  def validate_3 u1, u2 
    #10K
    puts 'validate 3'
  end
  
  def validate_4 u1, u2 
    #social run
    puts 'validate 4'
  end

  def validate_5 u1, u2 
    #marathon
    puts 'validate 5'
  end

end

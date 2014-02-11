class Challenge < ActiveRecord::Base
  attr_accessible :name, :start_date, :description, :image_url

  has_many :participations
  has_many :teams, through: :participations

  def self.validate_all team

    Challenge.all.each_with_index do |challenge, i|
      if not Participation.where("team_id = ? and challenge_id = ?", team.id, (i+1)).length > 0
        challenge.send("validate_#{i+1}", team.id, team.first_user, team.second_user)
      end
    end

  end

  def validate_1_helper t_id, r1, r2, r1_metric, r2_metric
    r1.each do |run1|
      run1_cst = run1[r1_metric].in_time_zone("Mexico City")
      r2.each do |run2|
        run2_cst = run2[r1_metric].in_time_zone("Mexico City")
        #Las dos carreras del mismo dia, entre 18 y 19 horas, mayor a 6 KM
        if run1_cst.day == run2_cst.day and [18,19].index(run1_cst.hour) and [18,19].index(run2_cst.hour) and (run1.kilometers + run2.kilometers > 6) 
          return Participation.create({:team_id => t_id, :challenge_id => 1, :accomplished => true})
        end
      end
    end
    return nil
  end

  def validate_1 t_id, u1, u2 
    #social run
    #Vale más una carrera entre amigas que un café por la tarde. Corran juntas 6km entre 6 y 8 PM.

    r1 = u1.runs ? u1.runs.where("published_date > ? or start_date > ?", self.start_date, self.start_date) : []
    r2 = u2.runs ? u2.runs.where("published_date > ? or start_date > ?", self.start_date, self.start_date) : []

    if (r1.length > 0 and r2.length > 0)
      #Primero validamos por fecha publicada
      participation = self.validate_1_helper t_id, r1, r2, "published_date", "published_date"
      #ahora combinamos
      if not participation 
        participation = self.validate_1_helper t_id, r1, r2, "published_date", "start_date"
      end
      if not participation 
        participation = self.validate_1_helper t_id, r1, r2, "start_date", "published_date"
      end
      if not participation 
        participation = self.validate_1_helper t_id, r1, r2, "start_date", "start_date"
      end
    end

  end

  def validate_2 t_id, u1, u2 
    #fast track
    #Superen los entrenamientos anteriores y rompan su mejor tiempo.
    r1 = u1.runs.where("published_date < ? or start_date < ?", self.start_date, self.start_date)
    r2 = u2.runs.where("published_date < ? or start_date < ?", self.start_date, self.start_date)
    puts 'validate 2'
  end

  def validate_3 t_id, u1, u2 
    #wake_up
    puts 'validate 3'
  end

  def validate_4 t_id, u1, u2 
    #10K
    puts 'validate 4'
  end
  

  def validate_5 t_id, u1, u2 
    #marathon
    puts 'validate 5'
  end

end

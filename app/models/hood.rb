class Hood < ActiveRecord::Base
  attr_accessible :name, :picture_url_big, :picture_url_fb, :picture_url_normal, :picture_url_thumb
  has_many :users

  #Legacy code to calculate users & kilometers per hood
  def ind_stats
    hood_total_km = 0.0
    hood_total_users = 0
    self.users.each do |user|
      hood_total_km += user.kilometers
      hood_total_users += 1
    end
    return {:kilometers => hood_total_km.round(2), :users => hood_total_users}
  end
  
  def self.total_stats
    hoods = Hood.includes(:users) 
    hoods.each do |hood| 
      stats = hood.ind_stats
      hood["total_kilometers"] = stats[:kilometers]
      hood["total_users"] = stats[:users]
    end
    return hoods
  end

end

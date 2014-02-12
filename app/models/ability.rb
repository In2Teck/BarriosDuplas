class Ability
  include CanCan::Ability

  def initialize(user)
	  user ||= User.new # guest user
     if user.role? :admin
      can :manage, :all
	  else
		  can :manage, :display
      can :update, User
      cannot [:admin, :xls_all_users, :xls_all_teams], :display
      can [:create, :update, :notified], Team
      can [:create, :update, :accept, :cancel], Invite
      #cannot :csv, :display
      #cannot :print_attendees, :display
      #can :update_hood, User 
	  end
  end
end

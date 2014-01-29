class DisplayController < ApplicationController
	
  authorize_resource :class => false

  #VISTAS COMPLETAS

	def admin
    
	end

  def index #welcome + signup
    if current_user
      redirect_to :home
    end
  end

  def home
    @user = User.find(current_user.id).to_json(:only => [:id, :first_name, :last_name], :include => {:hood => {:only => [:name]}})
    @team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id)[0]
    @partner = nil
    @invited = nil
    @show_invites = false

    if (@team)
      if (@team.first_user_id == current_user.id)
        if (@team.second_user_id)
          @partner = User.find(@team.second_user_id).to_json(:only => [:id, :first_name, :last_name], :include => {:hood => {:only => [:name]}})
          @team = @team.to_json(:only => [:id, :name])
        else
          @invited = current_user.invites[0] ? current_user.invites[0].to_json(:only => [:id, :invited_user_facebook_id, :invited_user_name]) : nil
          @team = @team.to_json(:only => [:id, :name])
        end
      elsif (@team.second_user_id == current_user.id)
        if (@team.first_user_id)
          @partner = User.find(@team.first_user_id).to_json(:only => [:id, :first_name, :last_name], :include => {:hood => {:only => [:name]}})
          @team = @team.to_json(:only => [:id, :name])
        else
          @invited = current_user.invites[0] ? current_user.invites[0].to_json(:only => [:id, :invited_user_facebook_id, :invited_user_name]) : nil
          @team = @team.to_json(:only => [:id, :name])
        end
      end
    elsif (Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).length > 0)
      @show_invites = true
    end

    #@show_invites = false
    
    #if (!user.first_user_team && !user.second_user_team && Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).length > 0)
    #  @show_invites = true    
    ###if !has_team && Invite.where("invited_user_facebook_id = ? and accepted is null", "100000389125405").length > 0      
      ###@invites = Invite.where("invited_user_facebook_id = ?", "100000389125405").includes(:user).to_json(:include => :user) unless !current_user
    #end
  end
  
  def ranking 
    if current_user
      redirect_to :home_ranking
    end
    @total_ranking = Team.calculate_total_ranking.paginate(:page => params[:page], :per_page => 5)
  end

  def home_ranking
    @team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id)[0]
    if (@team.first_user_id == current_user.id)
      @partner = User.find(@team.second_user_id)
      @team = @team
    elsif (@team.second_user_id == current_user.id)
      @partner = User
      @team = @team
    end
    @challenges = @team.completed_challenges 
    @self_ranking = @team.calculate_self_ranking
    @total_ranking = Team.calculate_total_ranking.paginate(:page => params[:page], :per_page => 5)
  end

  def terminos

  end

  #VISTAS PARCIALES

  def nombre_usuario

  end

  def nombre_dupla

  end

  def invitar_amiga

  end

  def seleccion_barrio

  end

  def invitacion_aceptada

  end
  
  def run_clubs

  end

  def retos

  end

  def invitaciones_pendientes
    @invites = Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).includes(:user)#.to_json(:include => :user) unless !current_user
    render :partial => 'invitaciones_pendientes', :content_type => 'text/html'
  end

end

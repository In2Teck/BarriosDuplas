class DisplayController < ApplicationController
	
  authorize_resource :class => false

  #VISTAS COMPLETAS

	def admin
    
	end

  def index #welcome + signup

  end

  def home
    #@invites = Invite.where("invited_user_facebook_id = ?", current_user.facebook_id) unless !current_user
    @show_invites = false
    user = User.find(current_user.id)
    if (!user.first_user_team && !user.second_user_team && Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).length > 0)
      @show_invites = true

    #has_team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id).length > 0
    #if !has_team && Invite.where("invited_user_facebook_id = ? and accepted is null", "100000389125405").length > 0      
      #@invites = Invite.where("invited_user_facebook_id = ?", "100000389125405").includes(:user).to_json(:include => :user) unless !current_user
    end
  end
  
  def ranking 

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

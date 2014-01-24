class DisplayController < ApplicationController
	
  authorize_resource :class => false

  #VISTAS COMPLETAS

	def admin
    
	end

  def index #welcome + signup

  end

  def home
    #@invites = Invite.where("invited_user_facebook_id = ?", current_user.facebook_id) unless !current_user
    @invites = Invite.where("invited_user_facebook_id = ?", "100000389125405").to_json unless !current_user
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

end

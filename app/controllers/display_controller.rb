class DisplayController < ApplicationController
	
  authorize_resource :class => false

  #VISTAS COMPLETAS

	def admin
    
	end

  def index #welcome + signup

  end

  def home

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

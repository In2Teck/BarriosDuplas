class DisplayController < ApplicationController
  
  before_filter :authenticate_user!, :except => [:index, :terminos, :ranking]
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
    @user = User.find(current_user.id)
    @team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id)[0]
    @partner = nil
    @invited = nil
    @show_invites = false

    if (@team)
      if (@team.first_user_id == current_user.id)
        if (@team.second_user_id)
          @partner = User.find(@team.second_user_id)
        else
          invitation = current_user.invites.where("accepted is null")[0] 
          @invited =  invitation ? invitation : nil
        end
      elsif (@team.second_user_id == current_user.id)
        if (@team.first_user_id)
          @partner = User.find(@team.first_user_id)
        else
          invitation = current_user.invites.where("accepted is null")[0] 
          @invited =  invitation ? invitation : nil
        end
      end
    end
    if ( !@team || ( !@partner && !@invited ))
      if (Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).length > 0)
        @show_invites = true
      end
    end

    if params[:reload] && params[:reload] == "true"
      render :partial => 'home_reload', :content_type => 'text/html'
    end
  end
  
  def ranking 
    if current_user
      redirect_to :home_ranking
    end
    @total_ranking = Team.calculate_total_ranking.paginate(:page => params[:page], :per_page => 5)
  end

  def home_ranking
    @team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id)[0]
    @partner = nil
    if (@team.first_user_id == current_user.id)
      @partner = User.find(@team.second_user_id) if @team.second_user_id
    elsif (@team.second_user_id == current_user.id)
      @partner = User.find(@team.first_user_id) if @team.first_user_id
    end
    @challenges = @team.completed_challenges 
    @self_ranking = @team.calculate_self_ranking
    @total_ranking = Team.calculate_total_ranking.paginate(:page => params[:page], :per_page => 5)
  end

  def terminos

  end

  #VISTAS PARCIALES

  def nombre_usuario
    render :partial => 'nombre_usuario', :content_type => 'text/html'
  end

  def nombre_dupla
    render :partial => 'nombre_dupla', :content_type => 'text/html'
  end

  def invitar_amiga
    render :partial => 'invitar_amiga', :content_type => 'text/html'
  end

  def seleccion_barrio
    @hoods = Hood.all
    render :partial => 'seleccion_barrio', :content_type => 'text/html'
  end

  def invitacion_aceptada

  end
  
  def run_clubs

  end

  def retos

  end

  def conecta_twitter
    render :partial => 'conecta_twitter', :content_type => 'text/html'
  end

  def invitaciones_pendientes
    @invites = Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).includes(:user)#.to_json(:include => :user) unless !current_user
    render :partial => 'invitaciones_pendientes', :content_type => 'text/html'
  end

end

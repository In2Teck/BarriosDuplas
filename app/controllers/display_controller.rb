class DisplayController < ApplicationController
  
  before_filter :authenticate_user!, :except => [:index, :terminos, :ranking, :borrar_requests]
  authorize_resource :class => false

  #VISTAS COMPLETAS
  
  def xls_all_users
    @users = User.includes(:hood).order("kilometers DESC")
    respond_to do |format|
      format.xls
    end
  end

  def xls_all_teams
    @teams = Team.includes(:first_user, :second_user).order("kilometers DESC")
    respond_to do |format|
      format.xls
    end
  end

	def admin

    #Users
    @users_count = User.all.count
    @users_with_km_count = User.where("kilometers > 0").count
    @users_with_fb_problems = User.where("access_token is null").count
    @users_with_tw_problems = User.where("oauth_token is null and oauth_token_secret is null").count
    @users_kilometers = User.sum(:kilometers, :conditions => "kilometers > 0").round(2)

    @team_count = Team.all.count 
    @complete_teams = Team.where("first_user_id is not null and second_user_id is not null").count
    @complete_teams_with_km = Team.where("first_user_id is not null and second_user_id is not null and kilometers > 0").count
    @teams_kilometers = Team.sum(:kilometers, :conditions => "kilometers > 0").round(2)

    render :layout => "admin"    
	end

  def index #welcome + signup
    if current_user
      redirect_to :home
    end
  end

  def run_clubs

  end

  def home
    @user = User.find(current_user.id)
    @team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id)[0]
    @partner = nil
    @invited = nil
    @show_invites = false
    @show_twitter = @user.twitter_id ? true : false

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
    #if ( !@team || ( !@partner && !@invited ))
    if (!@partner)
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
      if current_user.first_user_team and current_user.first_user_team.first_user_id and current_user.first_user_team.second_user_id
        redirect_to :home_ranking
      end
      if current_user.second_user_team and current_user.second_user_team.first_user_id and current_user.second_user_team.second_user_id
        redirect_to :home_ranking
      end
    end
    @total_ranking = Team.calculate_total_ranking.paginate(:page => params[:page], :per_page => 10)
  end

  def home_ranking
    @team = Team.where("first_user_id = ? or second_user_id = ?", current_user.id, current_user.id)[0]
    if (@team and @team.first_user_id and @team.second_user_id)
      
      @partner = nil
      if (@team.first_user_id == current_user.id)
        @partner = User.find(@team.second_user_id) if @team.second_user_id
      elsif (@team.second_user_id == current_user.id)
        @partner = User.find(@team.first_user_id) if @team.first_user_id
      end
      @challenges = @team.completed_challenges 
      @self_ranking = @team.calculate_self_ranking
      @total_ranking = Team.calculate_total_ranking.paginate(:page => params[:page], :per_page => 10)
    else
      redirect_to :ranking
    end
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

  def retos
    @team = current_user.first_user_team ? current_user.first_user_team : current_user.second_user_team

    @social_run = Participation.where("team_id = ? and challenge_id = 1", @team.id).length > 0 ? "_completed" : "" 
    @marathon = Participation.where("team_id = ? and challenge_id = 5", @team.id).length > 0 ? "_completed" : ""
    @fast_track = Participation.where("team_id = ? and challenge_id = 2", @team.id).length > 0 ? "_completed" : ""
    @wake_up = Participation.where("team_id = ? and challenge_id = 3", @team.id).length > 0 ? "_completed" : ""
    @d10k = Participation.where("team_id = ? and challenge_id = 4", @team.id).length > 0 ? "_completed" : ""
  end

  def conecta_twitter
    @first_time = params[:first_time]
    render :partial => 'conecta_twitter', :content_type => 'text/html'
  end

  def invitaciones_pendientes
    @invites = Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id).includes(:user)#.to_json(:include => :user) unless !current_user
    render :partial => 'invitaciones_pendientes', :content_type => 'text/html'
  end

  def borrar_requests
    requests = params[:requests].split(",")
    invite = Invite.find_by_request_facebook_id(requests[0]);
    rg = RestGraph.new(:access_token => ENV['APP_TOKEN'])
    
    requests.each do | request |
      rg.delete(request + '_' + invite.invited_user_facebook_id)
    end
    render status: 200, json: {:message => 'done'}
  end

  def exclude_users
    @invited_user = []
    Team.where("first_user_id is not null and second_user_id is not null").includes(:first_user, :second_user).each do |team|
      @invited_user.push(team.first_user.facebook_id)
      @invited_user.push(team.second_user.facebook_id)
    end
    render json: @invited_user, status: 200
  end

  def editar_registro
    render :partial => 'editar_registro', :content_type => 'text/html'
  end

end

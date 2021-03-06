class TeamsController < ApplicationController

  layout "admin"

  load_and_authorize_resource :except => [:update, :create, :new, :notified]

  # GET /teams
  # GET /teams.json
  def index
    @teams = Team.search(params[:search]).order("kilometers DESC").paginate(:per_page => 100, :page => params[:page])


    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @teams }
    end
  end

  # GET /teams/1
  # GET /teams/1.json
  def show
    @team = Team.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @team }
    end
  end

  # GET /teams/new
  # GET /teams/new.json
  def new
    @team = Team.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @team }
    end
  end

  # GET /teams/1/edit
  def edit
    @team = Team.find(params[:id])
  end

  # POST /teams
  # POST /teams.json
  def create
    @team = Team.new(params[:team])
    user = User.find(@team.first_user_id)
    if (!user.first_user_team && !user.second_user_team)
      respond_to do |format|
        if @team.save
          format.html { redirect_to @team, notice: 'Team was successfully created.' }
          format.json { render json: @team, status: :created, location: @team }
        else
          format.html { render action: "new" }
          format.json { render json: @team.errors, status: :unprocessable_entity }
        end
      end
    else
      render json: {:message => 'has team'}, status: 200
    end
  end

  # PUT /teams/1
  # PUT /teams/1.json
  def update
    @team = Team.find(params[:id])

    @team.challenges.destroy_all
    Challenge.all.each do |challenge|
      chal = params["challenge_#{challenge.id}"]
      if chal 
        Participation.create({:team_id => @team.id, :challenge_id => challenge.id})
      end
    end

    respond_to do |format|
      if @team.update_attributes(params[:team])
        format.html { redirect_to @team, notice: 'Team was successfully updated.' }
        format.json { render json: @team.id, status: :ok}
      else
        format.html { render action: "edit" }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teams/1
  # DELETE /teams/1.json
  def destroy
    @team = Team.find(params[:id])
    @team.destroy

    respond_to do |format|
      format.html { redirect_to teams_url }
      format.json { head :no_content }
    end
  end

  def notified
    team = Team.find(params[:team_id])
    team.update_attribute(:notify_author, false)
    render json: team, status: 200
  end
end

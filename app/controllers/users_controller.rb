class UsersController < ApplicationController

  layout "admin"

  load_and_authorize_resource

  # GET /users
  # GET /users.json
  def index
    @users = User.search(params[:search]).order("kilometers DESC").paginate(:per_page => 100, :page => params[:page])

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/new
  # GET /users/new.json
  def new
    @user = User.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @user }
    end
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  # POST /users
  # POST /users.json
  def create
    
    @user = Run.new(params[:user])
   
    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /users/1
  # PUT /users/1.json
  def update
    @user = User.find(params[:id])

    @user.additional_badges.destroy_all
    dupla = nil
    if @user.first_user_team and @user.first_user_team.second_user 
      dupla = @user.first_user_team.second_user
      dupla.additional_badges.destroy_all
    elsif @user.second_user_team and @user.second_user_team.first_user
      dupla = @user.second_user_team.first_user
      dupla.additional_badges.destroy_all
    end

    AdditionalBadge.all.each do |ab|
      badge = params["ab_#{ab.id}"]
      if badge
        @user.additional_badges << ab 
        if dupla
          dupla.additional_badges << ab
        end
      end
    end

    respond_to do |format|
      if @user.update_attributes(params[:user])
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: @user.id, status: :ok}
      else
        format.html { render action: "edit" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user = User.find(params[:id])
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url }
      format.json { head :no_content }
    end
  end
end

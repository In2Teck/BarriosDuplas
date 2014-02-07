class InvitesController < ApplicationController
  # GET /invites
  # GET /invites.json
  def index
    @invites = Invite.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @invites }
    end
  end

  # GET /invites/1
  # GET /invites/1.json
  def show
    @invite = Invite.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @invite }
    end
  end

  # GET /invites/new
  # GET /invites/new.json
  def new
    @invite = Invite.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @invite }
    end
  end

  # GET /invites/1/edit
  def edit
    @invite = Invite.find(params[:id])
  end

  # POST /invites
  # POST /invites.json
  def create
    @invite = Invite.new(params[:invite])
    @invite.user_id = current_user.id

    respond_to do |format|
      if @invite.save
        format.html { redirect_to @invite, notice: 'Invite was successfully created.' }
        format.json { render json: @invite, status: :created, location: @invite }
      else
        format.html { render action: "new" }
        format.json { render json: @invite.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /invites/1
  # PUT /invites/1.json
  def update
    @invite = Invite.find(params[:id])

    respond_to do |format|
      if @invite.update_attributes(params[:invite])
        format.html { redirect_to @invite, notice: 'Invite was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @invite.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /invites/1
  # DELETE /invites/1.json
  def destroy
    @invite = Invite.find(params[:id])
    @invite.destroy

    respond_to do |format|
      format.html { redirect_to invites_url }
      format.json { head :no_content }
    end
  end

  def accept
    invite = Invite.find(params[:invite_id])
    invite.update_attribute(:accepted, true)
    
    team = Team.find_by_first_user_id(invite.user_id)
    team.update_attribute(:second_user_id, current_user.id)
    team.update_attribute(:notify_author, true)

    otherTeam = current_user.first_user_team
    if otherTeam
      otherTeam.destroy
    end

    otherInvites = Invite.where("invited_user_facebook_id = ? and accepted is null", current_user.facebook_id)
    otherInvites.each do | other |
      other.update_attribute(:accepted, false)
    end

    render json: invite, status: 200
  end

  def cancel
    invite = Invite.find(params[:invite_id])
    invite.update_attribute(:accepted, false)

    render json: invite, status: 200
  end
end

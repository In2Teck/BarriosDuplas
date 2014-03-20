class AdditionalBadgesController < ApplicationController
  # GET /additional_badges
  # GET /additional_badges.json
  def index
    @additional_badges = AdditionalBadge.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @additional_badges }
    end
  end

  # GET /additional_badges/1
  # GET /additional_badges/1.json
  def show
    @additional_badge = AdditionalBadge.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @additional_badge }
    end
  end

  # GET /additional_badges/new
  # GET /additional_badges/new.json
  def new
    @additional_badge = AdditionalBadge.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @additional_badge }
    end
  end

  # GET /additional_badges/1/edit
  def edit
    @additional_badge = AdditionalBadge.find(params[:id])
  end

  # POST /additional_badges
  # POST /additional_badges.json
  def create
    @additional_badge = AdditionalBadge.new(params[:additional_badge])

    respond_to do |format|
      if @additional_badge.save
        format.html { redirect_to @additional_badge, notice: 'Additional badge was successfully created.' }
        format.json { render json: @additional_badge, status: :created, location: @additional_badge }
      else
        format.html { render action: "new" }
        format.json { render json: @additional_badge.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /additional_badges/1
  # PUT /additional_badges/1.json
  def update
    @additional_badge = AdditionalBadge.find(params[:id])

    respond_to do |format|
      if @additional_badge.update_attributes(params[:additional_badge])
        format.html { redirect_to @additional_badge, notice: 'Additional badge was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @additional_badge.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /additional_badges/1
  # DELETE /additional_badges/1.json
  def destroy
    @additional_badge = AdditionalBadge.find(params[:id])
    @additional_badge.destroy

    respond_to do |format|
      format.html { redirect_to additional_badges_url }
      format.json { head :no_content }
    end
  end
end

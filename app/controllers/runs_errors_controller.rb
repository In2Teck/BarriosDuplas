class RunsErrorsController < ApplicationController
  # GET /runs_errors
  # GET /runs_errors.json
  def index
    @runs_errors = RunsError.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @runs_errors }
    end
  end

  # GET /runs_errors/1
  # GET /runs_errors/1.json
  def show
    @runs_error = RunsError.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @runs_error }
    end
  end

  # GET /runs_errors/new
  # GET /runs_errors/new.json
  def new
    @runs_error = RunsError.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @runs_error }
    end
  end

  # GET /runs_errors/1/edit
  def edit
    @runs_error = RunsError.find(params[:id])
  end

  # POST /runs_errors
  # POST /runs_errors.json
  def create
    @runs_error = RunsError.new(params[:runs_error])

    respond_to do |format|
      if @runs_error.save
        format.html { redirect_to @runs_error, notice: 'Runs error was successfully created.' }
        format.json { render json: @runs_error, status: :created, location: @runs_error }
      else
        format.html { render action: "new" }
        format.json { render json: @runs_error.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /runs_errors/1
  # PUT /runs_errors/1.json
  def update
    @runs_error = RunsError.find(params[:id])

    respond_to do |format|
      if @runs_error.update_attributes(params[:runs_error])
        format.html { redirect_to @runs_error, notice: 'Runs error was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @runs_error.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /runs_errors/1
  # DELETE /runs_errors/1.json
  def destroy
    @runs_error = RunsError.find(params[:id])
    @runs_error.destroy

    respond_to do |format|
      format.html { redirect_to runs_errors_url }
      format.json { head :no_content }
    end
  end
end

class RegistrationsController < Devise::RegistrationsController            
  skip_before_filter :require_no_authentication     

  def create
   
    @user = User.new(params[:user])
    @user.roles = [Role.where("name = 'external'").first]

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

end

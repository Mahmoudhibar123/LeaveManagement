class V1::UsersController < ApplicationController
    def index 
        @users = User.all

        render json: @users, status: :ok
    end

    def create 
        @user = User.new(user_params)

        @user.save
        render json: @user, status: :created
    end


    def show 
        render json: @user, adapter: :json
    end



    def destroy
        @user = User.where(id: params[:id]).first
        if @user.destroy
            head(:ok)
        else
            head(:unprocessable_entity)
        end

    end

    def update
        if @author.update(author_params)
          render json: @author, adapter: :json, status: 200
        else
          render json: { error: @author.errors }, status: 422
        end
      end

    private

    def user_params
        params.require (:user).permit(:email, :password, :fullname, :leave_period, :address, :role, :avatar)
    end
    
end

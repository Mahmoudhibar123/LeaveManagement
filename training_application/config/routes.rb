Rails.application.routes.draw do
  devise_for :users

  namespace :v1 do

  resources :users, only: [:index, :create, :update, :destroy, :show] do
    get :avatar, on: :member 
  end
  resources :leaves, only: [:index, :create, :update, :destroy, :show]

   


end

end

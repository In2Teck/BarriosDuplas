NosotrasCorremos::Application.routes.draw do
  resources :runs_errors


  resources :participations


  resources :challenges


  resources :teams do
    match 'notified'
  end

  resources :hoods


  resources :runs


  resources :invites do
    match 'accept'
    match 'cancel'
  end

  resources :roles

  devise_for :users, :controllers => {:omniauth_callbacks => "users/omniauth_callbacks", :registrations => "registrations"}

  devise_scope :user do
	  get 'logout', :to => "devise/sessions#destroy"
	  get 'signin', :to => "devise/sessions#new"
	  get 'signup', :to => "devise/registrations#new"
  end

  resources :users

  match 'admin' => 'display#admin', :as => :admin
  
  match 'admin_users' => 'display#admin_users', :as => :admin_users
  
  match 'admin_teams' => 'display#admin_teams', :as => :admin_teams
  
  match 'home' => 'display#home', :as => :home
  
  match 'ranking' => 'display#ranking', :as => :ranking
  
  match 'home_ranking' => 'display#home_ranking', :as => :home_ranking
  
  match 'terminos' => 'display#terminos', :as => :terminos

  match 'retos' => 'display#retos', :as => :retos

  match 'xls_all_users' => 'display#xls_all_users', :as => :xls_all_users
  
  match 'xls_all_teams' => 'display#xls_all_teams', :as => :xls_all_teams
  
  match 'xls_all_teams_csv' => 'display#xls_all_teams_csv', :as => :xls_all_teams_csv

  match 'xls_stolen_kms' => 'display#xls_stolen_kms', :as => :xls_stolen_kms

  # VISTAS PARCIALES

  match 'nombre_usuario' => 'display#nombre_usuario', :as => :nombre_usuario

  match 'nombre_dupla' => 'display#nombre_dupla', :as => :nombre_dupla
  
  match 'invitar_amiga' => 'display#invitar_amiga', :as => :invitar_amiga
  
  match 'seleccion_barrio' => 'display#seleccion_barrio', :as => :seleccion_barrio
  
  match 'invitacion_aceptada' => 'display#invitacion_aceptada', :as => :invitacion_aceptada
  
  match 'run_clubs' => 'display#run_clubs', :as => :run_clubs
  
  match 'invitaciones_pendientes' => 'display#invitaciones_pendientes', :as => :invitaciones_pendientes

  match 'conecta_twitter' => 'display#conecta_twitter', :as => :conecta_twitter

  match 'borrar_requests' => 'display#borrar_requests', :as => :borrar_requests

  match 'exclude_users' => 'display#exclude_users', :as => :exclude_users

  match 'editar_registro' => 'display#editar_registro', :as => :editar_registro

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => 'display#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end

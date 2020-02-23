Rails.application.routes.draw do
  get '/films',  to: 'films#index'
  get '/films/:id', to: 'films#show'
  get '/films/:dStart/:dEnd', to: 'films#getfilmsIn'
  post '/films/create', to: 'films#create'

  get '/bookings', to: 'bookings#index'
  get '/bookings/getBookingsFor/:idFilm', to: 'bookings#getBookingsFor'
  post '/bookings/create', to: 'bookings#create'
  get '/bookings/:dStart/:dEnd', to: 'bookings#getbookingsIn'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

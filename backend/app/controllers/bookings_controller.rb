class BookingsController < ApplicationController

 # GET /bookings
 def index
  @bookings = Booking.select("bookings.*, films.tittle").joins(:film)

  render json: @bookings
end

# POST /bookings
def create
  @booking = Booking.new(booking_params)

  if @booking.save
    render status: :created
  else
    render json: @booking.errors, status: :unprocessable_entity
  end
end

# GET /getBookingsFor/:idFilm
def getBookingsFor
  @bookingsFor = Booking.select("bookings.*, films.tittle").joins(:film).where(film: params[:idFilm])
  render json: @bookingsFor, status: :ok
end


def getbookingsIn
  begin
    startDayGiven = Date.parse(params[:dStart])
    endDayGiven = Date.parse(params[:dEnd])
    
    @bookings = Booking.select("bookings.*, films.tittle").joins(:film).where("day BETWEEN ? AND ?", startDayGiven, endDayGiven)

    render json: @bookings, status: :ok
  rescue
    render json: { "error"=>"Envío incorrecto de parametros de fecha. El formato es yyyy-mm-dd" }, status: :bad_request
  end
end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def booking_params
      params.require(:booking).permit(:film_id, :day, :cedula, :nombre, :correo, :celular)
    end
end

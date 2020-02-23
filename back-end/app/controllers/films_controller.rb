class FilmsController < ApplicationController
  before_action :set_film, only: [:show]

  # GET /films
  def index
    @films = Film.all

    render json: @films
  end

  # GET /films/getfilmsIn/:dStart/:dEnd 
  def getfilmsIn
    begin
      startDayGiven = Date.parse(params[:dStart])
      endDayGiven = Date.parse(params[:dEnd])
      @films = Film.where("(startDay BETWEEN ? AND ?) OR (endDate BETWEEN ? AND ?) or (startDay <= ? AND endDate >= ?)", startDayGiven, endDayGiven, startDayGiven, endDayGiven, startDayGiven, endDayGiven)

      lockedList = []

      @films.each do |film|
        bookings = (Booking.select("bookings.*").joins(:film).where(film: film.id)).length()
        
        if bookings < 10 then
          lockedList.push(false);
        else
          lockedList.push(true);
        end
      end
      render json: [@films, lockedList], status: :ok
    rescue
      render json: { "error"=>"Envío incorrecto de parametros de fecha. El formato es yyyy-mm-dd" }, status: :bad_request
    end
  end

  # GET /films/1
  def show
    render json: @film
  end

  # POST /films
  def create
    @film = Film.new(film_params)

    if @film.save
      render json: @film, status: :created
    else
      render json: @film.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_film
      @film = Film.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def film_params
      params.require(:film).permit(:tittle, :synopsis, :image, :startDay, :endDate)
    end
end

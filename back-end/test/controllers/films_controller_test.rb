require 'test_helper'

class FilmsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @film = films(:one)
  end

  test "should get index" do
    get films_url, as: :json
    assert_response :success
  end

  test "should create film" do
    assert_difference('Film.count') do
      post films_url, params: { film: { endDate: @film.endDate, image: @film.image, startDay: @film.startDay, synopsis: @film.synopsis, tittle: @film.tittle } }, as: :json
    end

    assert_response 201
  end

  test "should show film" do
    get film_url(@film), as: :json
    assert_response :success
  end

  test "should update film" do
    patch film_url(@film), params: { film: { endDate: @film.endDate, image: @film.image, startDay: @film.startDay, synopsis: @film.synopsis, tittle: @film.tittle } }, as: :json
    assert_response 200
  end

  test "should destroy film" do
    assert_difference('Film.count', -1) do
      delete film_url(@film), as: :json
    end

    assert_response 204
  end
end

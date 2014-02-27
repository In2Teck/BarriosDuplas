require 'test_helper'

class RunsErrorsControllerTest < ActionController::TestCase
  setup do
    @runs_error = runs_errors(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:runs_errors)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create runs_error" do
    assert_difference('RunsError.count') do
      post :create, runs_error: { accounted: @runs_error.accounted, kilometers: @runs_error.kilometers, pace: @runs_error.pace, published_date: @runs_error.published_date, run_id: @runs_error.run_id, run_url: @runs_error.run_url, start_date: @runs_error.start_date, user_id: @runs_error.user_id }
    end

    assert_redirected_to runs_error_path(assigns(:runs_error))
  end

  test "should show runs_error" do
    get :show, id: @runs_error
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @runs_error
    assert_response :success
  end

  test "should update runs_error" do
    put :update, id: @runs_error, runs_error: { accounted: @runs_error.accounted, kilometers: @runs_error.kilometers, pace: @runs_error.pace, published_date: @runs_error.published_date, run_id: @runs_error.run_id, run_url: @runs_error.run_url, start_date: @runs_error.start_date, user_id: @runs_error.user_id }
    assert_redirected_to runs_error_path(assigns(:runs_error))
  end

  test "should destroy runs_error" do
    assert_difference('RunsError.count', -1) do
      delete :destroy, id: @runs_error
    end

    assert_redirected_to runs_errors_path
  end
end

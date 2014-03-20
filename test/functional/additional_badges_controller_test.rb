require 'test_helper'

class AdditionalBadgesControllerTest < ActionController::TestCase
  setup do
    @additional_badge = additional_badges(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:additional_badges)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create additional_badge" do
    assert_difference('AdditionalBadge.count') do
      post :create, additional_badge: { name: @additional_badge.name }
    end

    assert_redirected_to additional_badge_path(assigns(:additional_badge))
  end

  test "should show additional_badge" do
    get :show, id: @additional_badge
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @additional_badge
    assert_response :success
  end

  test "should update additional_badge" do
    put :update, id: @additional_badge, additional_badge: { name: @additional_badge.name }
    assert_redirected_to additional_badge_path(assigns(:additional_badge))
  end

  test "should destroy additional_badge" do
    assert_difference('AdditionalBadge.count', -1) do
      delete :destroy, id: @additional_badge
    end

    assert_redirected_to additional_badges_path
  end
end

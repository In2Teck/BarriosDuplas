require 'test_helper'

class HoodsControllerTest < ActionController::TestCase
  setup do
    @hood = hoods(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:hoods)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create hood" do
    assert_difference('Hood.count') do
      post :create, hood: { name: @hood.name, picture_url_big: @hood.picture_url_big, picture_url_fb: @hood.picture_url_fb, picture_url_normal: @hood.picture_url_normal, picture_url_thumb: @hood.picture_url_thumb }
    end

    assert_redirected_to hood_path(assigns(:hood))
  end

  test "should show hood" do
    get :show, id: @hood
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @hood
    assert_response :success
  end

  test "should update hood" do
    put :update, id: @hood, hood: { name: @hood.name, picture_url_big: @hood.picture_url_big, picture_url_fb: @hood.picture_url_fb, picture_url_normal: @hood.picture_url_normal, picture_url_thumb: @hood.picture_url_thumb }
    assert_redirected_to hood_path(assigns(:hood))
  end

  test "should destroy hood" do
    assert_difference('Hood.count', -1) do
      delete :destroy, id: @hood
    end

    assert_redirected_to hoods_path
  end
end

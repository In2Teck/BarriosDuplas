class AddDescriptionAndImageUrlToChallenges < ActiveRecord::Migration
  def change
    add_column :challenges, :description, :text
    add_column :challenges, :image_url, :text
  end
end

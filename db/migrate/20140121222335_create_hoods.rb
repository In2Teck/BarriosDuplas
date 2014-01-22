class CreateHoods < ActiveRecord::Migration
  def change
    create_table :hoods do |t|
      t.string :name
      t.string :picture_url_thumb
      t.string :picture_url_normal
      t.string :picture_url_big
      t.string :picture_url_fb

      t.timestamps
    end
  end
end

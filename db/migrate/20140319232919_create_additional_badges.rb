class CreateAdditionalBadges < ActiveRecord::Migration
  def change
    create_table :additional_badges do |t|
      t.string :name

      t.timestamps
    end
  end
end

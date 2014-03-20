class CreateAdditionalBadgesUsers < ActiveRecord::Migration
 def change
    create_table :additional_badges_users do |t|
      t.integer :additional_badge_id
      t.integer :user_id
    end
  end 
end

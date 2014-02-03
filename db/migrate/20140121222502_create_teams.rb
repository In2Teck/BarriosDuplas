class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.string :name
      t.integer :first_user_id
      t.integer :second_user_id
      t.float :kilometers, :default => 0
      t.boolean :notify_author, :default => false

      t.timestamps
    end
  end
end

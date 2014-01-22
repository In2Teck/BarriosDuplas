class CreateParticipations < ActiveRecord::Migration
  def change
    create_table :participations do |t|
      t.integer :team_id
      t.integer :challenge_id
      t.integer :register_number
      t.boolean :accomplished, :default => false

      t.timestamps
    end
  end
end

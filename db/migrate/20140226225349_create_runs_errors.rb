class CreateRunsErrors < ActiveRecord::Migration
  def change
    create_table :runs_errors do |t|
      t.integer :user_id
      t.string :run_id
      t.string :run_url
      t.float :kilometers, :default => 0
      t.float :pace
      t.datetime :published_date
      t.datetime :start_date
      t.boolean :accounted, :default => false
      t.text :json
      t.boolean :twitter

      t.timestamps
    end
  end
end

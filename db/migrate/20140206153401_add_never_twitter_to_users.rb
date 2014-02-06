class AddNeverTwitterToUsers < ActiveRecord::Migration
  def change
    add_column :users, :never_twitter, :boolean, :default => false
  end
end

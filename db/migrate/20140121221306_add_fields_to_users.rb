class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hood_id, :integer
    add_column :users, :facebook_id, :string
    add_column :users, :twitter_id, :string
    add_column :users, :access_token, :string
    add_column :users, :oauth_token, :string
    add_column :users, :oauth_token_secret, :string
    add_column :users, :last_facebook_run, :datetime
    add_column :users, :last_twitt_id, :string
    add_column :users, :kilometers, :float, :default => 0
    add_column :users, :age, :integer
    add_column :users, :facebook_hash, :text
    add_column :users, :twitter_hash, :text
  end
end

class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :user_id
      t.string :invited_user_facebook_id
      t.string :invited_user_name
      t.boolean :accepted, :default => false

      t.timestamps
    end
  end
end

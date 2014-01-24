class CreateInvites < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.integer :user_id
      t.string :invited_user_facebook_id
      t.string :invited_user_name
      t.string :request_facebook_id
      t.boolean :accepted

      t.timestamps
    end
  end
end

class AddMissionToTeams < ActiveRecord::Migration
  def change
    add_column :teams, :mission, :boolean
  end
end

class CreateLeaves < ActiveRecord::Migration[5.2]
  def change
    create_table :leaves do |t|
      t.string :userFullName
      t.date :startDate
      t.date :endDate
      t.boolean :state
      t.references :user, foreign_key: true, null: false

      t.timestamps
    end
  end
end

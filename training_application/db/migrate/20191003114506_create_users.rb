class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password
      t.string :address
      t.string :fullname
      t.integer :role
      t.decimal :leave_period
      t.timestamps
    end
  end
end

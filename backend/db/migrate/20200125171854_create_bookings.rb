class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.references :film, foreign_key: true
      t.date :day
      t.string :cedula
      t.string :nombre
      t.string :correo
      t.string :celular

      t.timestamps
    end
  end
end

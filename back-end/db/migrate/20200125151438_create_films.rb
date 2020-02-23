class CreateFilms < ActiveRecord::Migration[5.2]
  def change
    create_table :films do |t|
      t.string :tittle, null: false
      t.string :synopsis, null: false 
      t.string :image, null: false
      t.date :startDay, null: false
      t.date :endDate, null: false

      t.timestamps
    end
  end
end

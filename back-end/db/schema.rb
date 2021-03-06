# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_25_171854) do

  create_table "bookings", force: :cascade do |t|
    t.integer "film_id"
    t.date "day"
    t.string "cedula"
    t.string "nombre"
    t.string "correo"
    t.string "celular"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["film_id"], name: "index_bookings_on_film_id"
  end

  create_table "films", force: :cascade do |t|
    t.string "tittle", null: false
    t.string "synopsis", null: false
    t.string "image", null: false
    t.date "startDay", null: false
    t.date "endDate", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

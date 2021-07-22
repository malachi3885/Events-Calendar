# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'date'

events = Event.create([
    {
        title: "Clear room",
        description: "My room so dirty!",
        date: DateTime.new(2021,7,24,13,0,0),
        color: "blue",
    },
    {
        title: "Datawow assingment",
        description: "Calendar",
        date: DateTime.new(2021,7,29,16,0,0),
        color: "red",
    },
])
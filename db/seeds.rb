# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

role_admin = Role.create(name: 'admin')
role_external = Role.create(name: 'external')
#User.create(first_name: 'admin', last_name: 'admin', email: 'admin@admin.com', password: 'adminadmin', roles: [role_admin])
Hood.create(name: 'Tlalnepantla')
Hood.create(name: 'Satelite')

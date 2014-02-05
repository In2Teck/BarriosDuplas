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

Hood.create(name: 'Bosque de Tlalpan')
Hood.create(name: 'Satelite')
Hood.create(name: 'Portales')
Hood.create(name: 'Juarez')
Hood.create(name: 'Iztapalapa')
Hood.create(name: 'Del Valle')
Hood.create(name: 'Coyoacan')
Hood.create(name: 'Tlatelolco')
Hood.create(name: 'Condesa')
Hood.create(name: 'Coapa')
Hood.create(name: 'Churubusco')
Hood.create(name: 'Chapultepec')
#Barrios sin imágenes
Hood.create(name: 'Tepito')
Hood.create(name: 'Roma')
Hood.create(name: 'Juarez')
Hood.create(name: 'Lagunilla')
Hood.create(name: 'Zona Rosa')
Hood.create(name: 'Doctores')
Hood.create(name: 'San Rafael')
Hood.create(name: 'Santa Maria de la Ribera')
Hood.create(name: 'San Miguel Chapultepec')
Hood.create(name: 'Xochimilco')
Hood.create(name: 'Polanco')
Hood.create(name: 'Napoles')
Hood.create(name: 'Narvarte')
Hood.create(name: 'Lindavista')
Hood.create(name: 'Vallejo')
Hood.create(name: 'Central de Abastos')
Hood.create(name: 'La Merced')
Hood.create(name: 'Escandon')
Hood.create(name: 'Peralvillo')
Hood.create(name: 'Agricola Oriental')
Hood.create(name: 'San Angel')
Hood.create(name: 'Santa Fe')
Hood.create(name: 'La Raza')
Hood.create(name: 'San Pedro de los Pinos')
Hood.create(name: 'Rio Blanco')
Hood.create(name: 'Ermita Iztapalapa')
Hood.create(name: 'Tacubaya')
Hood.create(name: 'Virreyes')
Hood.create(name: 'Tlalpan')
Hood.create(name: 'Balbuena')
Hood.create(name: 'Interlomas')
Hood.create(name: 'Barranca Seca')
Hood.create(name: 'San Pedro Mixquic')

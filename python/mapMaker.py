import csv
import folium

import datetime
results = []

# map maker needs to be told the type of boat class it is making today
# we now know the date
today = datetime.date.today()


import mysql.connector

class Boat:
    def __init__(self, bType, sNum):
        self.bType = bType
        self.sNum = sNum
    results = []
    def addResults(self,lat,lon):
        self.results.append([lat,lon])
    def getbType(self):
        return self.bType
    def getsNum(self):
        return self.sNum
    def getName(self):
        return str(self.bType) + str(self.sNum)
    def getResults(self):
        return self.results
        
cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1',
                              database='sailboating')
cursor = cnx.cursor(buffered=True, dictionary=True)
cursor2 = cnx.cursor(buffered=True)
query = ("SELECT DISTINCT boat_type FROM data "
         "WHERE DATE(date) = '2022-11-20'")


cursor.execute(query)
boatsy = []
for (boat_type) in cursor:
    boatsy.append(boat_type["boat_type"])
    print(boat_type)
# change to DATE(date) = CURDATE() for production
allboats = []
for boatType in boatsy:
    newquery = ("SELECT DISTINCT sail_number FROM data "
         "WHERE DATE(date) = '2022-11-20' and boat_type = %s")
    cursor.execute(newquery, (boatType,))
    for sailNum in cursor:
        allboats.append(Boat(boatType, sailNum["sail_number"]))

for sailBoat in allboats:
    newquery = ("SELECT lat,lon FROM data "
         "WHERE DATE(date) = '2022-11-20' and boat_type = %s and sail_number = %s")
    cursor.execute(newquery, (sailBoat.bType,sailBoat.sNum))
    for latlon in cursor:
        templat = latlon["lat"]
        tempLon = latlon["lon"]
        sailBoat.addResults(templat,tempLon)
        


cursor.close()
cnx.close()

    
# A1cords = results
for boatType in boatsy:
    print("HI")
    m=folium.Map(location=[42.571688,-88.522861], zoom_start=14)
    for boat in allboats:
        if(boat.bType == boatType):
            f1=folium.FeatureGroup(boat.getName())
            line_1=folium.vector_layers.PolyLine(boat.getResults(),tooltip=boat.getName(),weight=1).add_to(f1)
            f1.add_to(m) 
        
    folium.LayerControl().add_to(m)
    pathname = f"/Users/bean/Desktop/maps/{boatType}/{today}.html"
    m.save(pathname)
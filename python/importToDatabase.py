# this is a working connector from python to mysql the usb file path has to be changed to the final version of pi's usb
import csv
import mysql.connector    
cnx = mysql.connector.connect(user='root', password='',
                              host='127.0.0.1',
                              database='sailboating')
add_bData = ("INSERT INTO data "
              "(lat, lon, date, boat_type, sail_number) "
              "VALUES (%s, %s, %s, %s, %s)")

try:
    
    cursor = cnx.cursor()
    with open("/Users/chris/Desktop/mapData/raceA3.csv",newline='') as csvfile:
        reader = csv.reader(csvfile, delimiter=',',quotechar='|' )
        for row in reader:
            lat = float(row[0])
            long = float(row[1])
            datey = (row[2])
            boatType = (row[3])
            boatNumber = (row[4])
            bData =(lat, long, datey, boatType, boatNumber)
            cursor.execute(add_bData, bData) 
            cnx.commit() 
finally:
    cursor.close()
    cnx.close()
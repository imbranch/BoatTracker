import csv
import folium
import datetime
results = []

# map maker needs to be told the type of boat class it is making today
# we now know the date
today = datetime.date


with open("/Users/bean/Desktop/gpsCSVtest.csv",newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',',quotechar='|' )
    for row in reader:
        lat = float(row[0])
        long = float(row[1])
        temp = [lat,long]
        results.append(temp)
    
A1cords = results

m=folium.Map(location=[42.571688,-88.522861], zoom_start=14)
f1=folium.FeatureGroup("A1")
line_1=folium.vector_layers.PolyLine(A1cords,popup='<b>Path of boat A1</b>',tooltip='A1',color='blue',weight=1).add_to(f1)
f1.add_to(m)
folium.LayerControl().add_to(m)
m
#m.save('/Users/bean/Desktop/basic_folium_map_osm.html')
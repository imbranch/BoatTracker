import csv


# the doc is a work in progress


with open("/Users/bean/Desktop/gpsCSVtest.csv",newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',',quotechar='|' )
    for row in reader:
        lat = float(row[0])
        long = float(row[1])
        temp = [lat,long]
        results.append(temp)
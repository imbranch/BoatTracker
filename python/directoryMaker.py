from datetime import date, timedelta
import os

start_date = date(2022, 10, 1) 
end_date = date(2022, 10, 19)    # perhaps date.now()

delta = end_date - start_date   # returns timedelta
parent_dir = "/Volumes/gpsLog/"
for i in range(delta.days + 1):
    day = start_date + timedelta(days=i)
    path = os.path.join(parent_dir, str(day))
    os.mkdir(path)
    print(day)
#  https://learn.adafruit.com/adafruit-ultimate-gps-featherwing/circuitpython-library
import sys
import time
#import board
#import busio
import adafruit_gps
import datetime

today = datetime.date.today()

LOG_FILE = f"/Volumes/gpsLog/{str(today)}.csv"  # Example for writing to internal path gps.txt

LOG_MODE = "ab"

f = open(LOG_FILE,LOG_MODE)

# if sys.platform != "linux":
#     import storage

#     SD_CS_PIN = board.D10  # CS for SD card using Adalogger Featherwing
#     try:
#         import sdcardio

#         sdcard = sdcardio.SDCard(board.SPI, SD_CS_PIN)
#     except ImportError:
#         import adafruit_sdcard
#         import digitalio

#         sdcard = adafruit_sdcard.SDCard(
#             board.SPI(),
#             digitalio.DigitalInOut(SD_CS_PIN),
#         )

#     vfs = storage.VfsFat(sdcard)
#     storage.mount(vfs, "/sd")  # Mount SD card under '/sd' path in filesystem.
#     LOG_FILE = "/sd/gps.txt"  # Example for writing to SD card path /sd/gps.txt

import serial
uart = serial.Serial("/dev/tty.usbserial-1440", baudrate=9600, timeout=10)

gps = adafruit_gps.GPS(uart, debug=False)  # Use UART/pyserial

gps.send_command(b"PMTK314,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0")

gps.send_command(b"PMTK220,1000")
# Main loop just reads data from the GPS module and writes it back out to
# the output file while also printing to serial output.
last_print = time.monotonic()

while True:
        gps.update()
        current = time.monotonic()
        if current - last_print >= 1.0:
            last_print = current
            if not gps.has_fix:
                # Try again if we don't have a fix yet.
                print("Waiting for fix...")
                continue
            lat = str("{0:.6f}".format(gps.latitude))
            long = str("{0:.6f}".format(gps.longitude))
            timey = "{}-{}-{} {:02}:{:02}:{:02}".format(
                gps.timestamp_utc.tm_year,
                gps.timestamp_utc.tm_mon,
                gps.timestamp_utc.tm_mday,
                gps.timestamp_utc.tm_hour,
                gps.timestamp_utc.tm_min,
                gps.timestamp_utc.tm_sec,
            )
            sentence = lat+','+long+','+timey+',A,1'+'\n'
            sentence = sentence.encode('ASCII')
            if not sentence:
                continue
            print(str(sentence, "ascii").strip())
            #print(sentence)
            f.write(sentence)
            f.flush()

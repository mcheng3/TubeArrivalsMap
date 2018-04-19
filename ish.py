import requests
import json
import csv
csv = open('times.csv', "w")

key_file = open("keys.txt", "r")
app_id = key_file.readline()
app_key = key_file.readline()

def coords():
    stops_file = open("static/stops.json", "r")
    stops = stops_file.readline()
    print stops
    return stops


def times():
    u = requests.get("https://api.tfl.gov.uk/Mode/tube/Arrivals", data={"app_id":app_id, "app_key":app_key})
    data_string = u.json()
    d = data_string[0]
    print d

    '''for each in data_string:
        print '-------------------'
        a = each["platformName"] + ","
        b = each["id"] + ","
        c = each["timeToStation"] + ","
        print a+b+c+"\n"
        "csv.write(a+b+c+"\n");"
        '''


times()
'''coords()'''

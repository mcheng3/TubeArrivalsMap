from flask import Flask, render_template, session, redirect, url_for, flash,request
import random
import os
import requests
from ast import literal_eval
import ast, json, urllib2

key_file = open("keys.txt", "r")
app_id = key_file.readline()
app_key = key_file.readline()

app = Flask(__name__)

@app.route('/')
def root_route():
    return render_template("choose.html")


@app.route('/map')
def map():
    return render_template("map.html")

@app.route('/test')
def test():
    '''l = requests.get('https://api.tfl.gov.uk/line/mode/tube', data={"app_id":app_id, "app_key":app_key})
    print l
    lines_data = l.json()
    lines = []
    for line in lines_data:
        lines.append(line['id'])
    stops = {}
    for line in lines:
        stopData = {}
        print 'https://api.tfl.gov.uk/line/'+line+'/route/sequence/inbound'
        r= requests.get('https://api.tfl.gov.uk/line/'+line+'/route/sequence/inbound', data={"app_id":app_id, "app_key":app_key})
        sequences = r.json()
        for sequence in sequences['stopPointSequences']:
            if sequence['branchId'] == 0:
                stopData['name'] = sequences['lineName']
                stopData['stops'] = sequence['stopPoint']
            stops[line] = stopData
    #print stops
    stops_file = open("static/stops.json", "w")
    #print json.dumps(stops)
    stops_file.write(json.dumps(stops))'''
    stops_file = open("static/stops.json", "r")
    stops = stops_file.readline()
    stops = json.loads(stops)
    return render_template("test.html", stops=stops)

@app.route('/coords')
def coords():
    stops_file = open("static/stops.json", "r")
    stops = stops_file.readline()
    return stops

@app.route('/times')
def times():
    '''u = urllib2.urlopen("https://api.tfl.gov.uk/journey/journeyresults/westminster/to/bank")
    data_string = u.read()
    dic = json.loads(data_string)'''
    return u


if __name__ == "__main__":
    app.debug = True
    app.run()

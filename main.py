from flask import Flask, render_template, session, redirect, url_for, flash,request, jsonify
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
    return render_template("map.html", name="All")


@app.route('/map', methods = ['POST', 'GET'])
def map():
    bounds = request.args['bound']
    return render_template("map.html", name = request.args['way'])

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

@app.route('/times', methods = ['GET'])
def times(line = 'N136'):
    u = requests.get("https://api.tfl.gov.uk/line/"+line+"/arrivals", 
        data={"app_id":app_id, "app_key":app_key})
    data_string = u.json()
    d = data_string
    print d
    return jsonify(d)

@app.route('/times2', methods = ['GET'])
def times2():
    pass


if __name__ == "__main__":
    app.debug = True
    app.run()

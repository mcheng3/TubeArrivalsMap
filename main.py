from flask import Flask, render_template, session, redirect, url_for, flash
import random
import os
import requests
from ast import literal_eval
import ast, json

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

@app.route('/coords')
def coords():
    r= requests.get('https://api.tfl.gov.uk/StopPoint/Type/NaptanMetroStation', data={"app_id":app_id, "app_key":app_key})
    stations = r.json()
    stops = []
    for station in stations:
        if "tube" in station["modes"] or "dlr" in station["modes"]:
            stops.append(station)
    #print stops
    stops_file = open("static/stops.json", "w")
    #print json.dumps(stops)
    stops_file.write(json.dumps(stops))
    return render_template("test.html", stops=stops)

'''@app.route('/display_coords')
def display_coords():
    r = requests.get('/coords')'''

if __name__ == "__main__":
    app.debug = True
    app.run()

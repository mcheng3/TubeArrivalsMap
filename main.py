from flask import Flask, render_template, session, redirect, url_for, request, flash
import random
import os



app = Flask(__name__)

@app.route('/')
def root_route():
    print images.search("hello")[0]
    return render_template("choose.html")


@app.route('/map')
def root_route():
    print images.search("hello")[0]
    return render_template("map.html")


if __name__ == "__main__":
    app.debug = True
    app.run()

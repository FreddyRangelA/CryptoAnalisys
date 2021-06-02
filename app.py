  
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from flask_pymongo.wrappers import Database
import priceLive
import sqlite3
from flask import g

app = Flask(__name__)


@app.route("/")
def home():

    return render_template("index.html")
    
#S@app.route("/")
#def livePrice():
    

if __name__ == "__main__":
    app.run(debug=True)

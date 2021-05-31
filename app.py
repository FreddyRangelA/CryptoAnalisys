  
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
from flask_pymongo.wrappers import Database
import priceLive
import sqlite3
from flask import g

app = Flask(__name__)

# Use PyMongo to establish Mongo connection


#mongo = PyMongo(app, uri="mongodb://localhost:27017/project-2_db")
#Database='crypto_df.db'

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # # Find one record of data from the mongo database
    #data={} 
    #destination_data=Database


    # # Return template and data
    return render_template("index.html")
    
#S@app.route("/livePrice")
#def livePrice():
    #data = priceLive.livePrice()
    #mongo.db.collection.insert(data)
    # use mongo update to upsert data
    #mongo.db.collection.update({},data, upsert=True)
    #return redirect("/", code=302)

if __name__ == "__main__":
    app.run(debug=True)

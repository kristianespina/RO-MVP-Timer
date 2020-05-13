import flask
from flask import request, jsonify, Response
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import json
from bson.json_util import dumps, loads

app = flask.Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config["DEBUG"] = True
client = MongoClient("mongodb+srv://cluster0-1vdvj.gcp.mongodb.net/test", username="mvptracker", password="mvptracker")
db = client.mvptracker

trackerinfo = db.trackerinfo

mvpdata = db.mvpdata.find({})
mvpdata_bson = loads(dumps(mvpdata))

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return Response(dumps(mvpdata_bson), mimetype="text/html")

app.run()
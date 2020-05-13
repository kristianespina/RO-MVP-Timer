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

def fetch_data(accessCode):
    response = loads(dumps(trackerinfo.find({"accessCode": accessCode})))
    return response

def create_data(accessCode):
    response = mvpdata_bson
    for i in range(len(response)):
        response[i]['accessCode'] = accessCode
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin()
def catch_all(path):
    monsters = []
    accessCode = request.args.get('accessCode')
    if accessCode == "undefined":
        accessCode = ""
    monsters = fetch_data(accessCode)
    if not monsters:
        monsters = create_data(accessCode)
    sorted_monsters = sorted(monsters, key=lambda k: k['nextSpawn'])

    response = Response(dumps(sorted_monsters))
    return response
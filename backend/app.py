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
collection = db.trackerinfo


def fetch_data(accessCode, newAccesCode=""):
    response = loads(dumps(collection.find({"accessCode": accessCode})))
    for res in response:
        print(res) # todo replace accessCode
    return response

@app.route('/fetchData', methods=['GET', 'OPTIONS'])
@cross_origin()
def home():
    monsters = []
    accessCode = request.args.get('accessCode')
    monsters = fetch_data(accessCode)
    if not monsters:
        monsters = fetch_data("")
    sorted_monsters = sorted(monsters, key=lambda k: k['nextSpawn'])

    response = Response(dumps(sorted_monsters))
    return response

@app.route('/saveChanges', methods=['POST','OPTIONS'])
@cross_origin()
def post():
    content = request.get_json(force=True) # Ignore mime-type and always try to parse JSON
    print(content)
    return "OK"

app.run()
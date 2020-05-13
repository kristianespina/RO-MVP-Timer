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

@app.route('/', defaults={'path': ''},methods=['POST','OPTIONS'])
@app.route('/<path:path>',methods=['POST','OPTIONS'])
@cross_origin()
def catch_all(path):
    try:
        content = request.get_json(force=True) # Ignore mime-type and always try to parse JSON
        
        # get accessCode
        accessCode = content[0]['accessCode']

        # drop $_id key
        for monster in content:
            del monster['_id']

        trackerinfo.delete_many({"accessCode": accessCode})
        trackerinfo.insert_many(content)
        return "OK"
    except:
        return "FAILED", 424 # Error 424: Failed Dependency
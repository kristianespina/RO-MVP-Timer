import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

monsters = [
    {
        'id': '1',
        'accessKey': 'helloworld',
        'monsterId': '1734',
        'name': 'Kiel D-01',
        'lastSeen': '2020-05-12T00:20:51.168Z',
        'nextSpawn': '2020-05-12T00:23:51.168Z',
        'tomb': 'kh_dun02',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki',
    },
    {
        'id': '2',
        'accessKey': 'helloworld',
        'monsterId': '1871',
        'name': 'Fallen Bishop',
        'lastSeen': '2020-05-12T00:22:51.168Z',
        'nextSpawn': '2020-05-12T00:23:48.168Z',
        'tomb': 'abbey02',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki'
    },
    {
        'id': '3',
        'accessKey': 'helloworld',
        'monsterId': '1252',
        'name': 'Garm',
        'lastSeen': '2020-05-12T00:19:51.168Z',
        'nextSpawn': '2020-05-12T00:20:51.168Z',
        'tomb': 'xmas_fild01',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki'
    },
    {
        'id': '4',
        'accessKey': 'helloworld',
        'monsterId': '1751',
        'name': 'Randgris',
        'lastSeen': '2020-05-12T00:18:51.168Z',
        'nextSpawn': '2020-05-12T00:21:51.168Z',
        'tomb': 'odin_tem03',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki'
    },
]

@app.route('/', methods=['GET'])
def home():
    sorted_monsters = sorted(monsters, key=lambda k: k['nextSpawn'])
    response = jsonify(sorted_monsters)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

app.run()
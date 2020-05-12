import flask
from flask import request, jsonify

app = flask.Flask(__name__)
app.config["DEBUG"] = True

monsters = [
    {
        'id': '0',
        'accessKey': 'helloworld',
        'monsterId': '1734',
        'name': 'Kiel D-01',
        'lastSeen': '06:30',
        'nextSpawn': '08:30',
        'tomb': 'kh_dun02',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki',
    },
    {
        'id': '1',
        'accessKey': 'helloworld',
        'monsterId': '1871',
        'name': 'Fallen Bishop',
        'lastSeen': '06:30',
        'nextSpawn': '08:30',
        'tomb': 'abbey02',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki'
    },
    {
        'id': '2',
        'accessKey': 'helloworld',
        'monsterId': '1252',
        'name': 'Garm',
        'lastSeen': '06:30',
        'nextSpawn': '08:30',
        'tomb': 'xmas_fild01',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki'
    },
    {
        'id': '3',
        'accessKey': 'helloworld',
        'monsterId': '1751',
        'name': 'Randgris',
        'lastSeen': '06:30',
        'nextSpawn': '08:30',
        'tomb': 'odin_tem03',
        'isExactTime': True,
        'notes': '',
        'author': 'Akatsuki'
    },
]

@app.route('/fetchData', methods=['GET'])
def home():
    accessCode = request.args.get('accessCode')
    print(accessCode)
    sorted_monsters = sorted(monsters, key=lambda k: k['nextSpawn'])
    response = jsonify(sorted_monsters)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/saveChanges', methods=['POST'])
def post():
    content = request.get_json(force=True) # Ignore mime-type and always try to parse JSON
    return "OK"

app.run()
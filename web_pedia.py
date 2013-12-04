from flask import Flask, render_template, url_for, request
from flask_bootstrap import Bootstrap
from flask_sockets import Sockets

from pediapy import pediapy


app = Flask(__name__)

wiki = pediapy.Pediapy()
Bootstrap(app)
sockets = Sockets(app)
app.config['SECRET_KEY'] = 'devkey'


@sockets.route('/echo')
def echo_socket(ws):
	while True:
		message = ws.receive()
		wiki_generator = wiki.new_search(message)
		for article in wiki_generator:
			ws.send(article)


@app.route('/')
def index():
	return render_template('not_index.html')



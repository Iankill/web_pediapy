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
		try:
			for article in wiki_generator:
				ws.send(article)
		except pediapy.NotValidArticle:
			ws.send("NotValidArticle")


@app.route('/pediapy')
def index():
	return render_template('index.html')



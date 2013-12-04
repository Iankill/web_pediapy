from flask import Flask, render_template, url_for
from flask_bootstrap import Bootstrap

from time import gmtime, strftime

from pediapy import pediapy
from flask import request
import thread
import uuid
import os
from flask_sockets import Sockets


app = Flask(__name__)

wiki = pediapy.Pediapy()
Bootstrap(app)
sockets = Sockets(app)
app.config['SECRET_KEY'] = 'devkey'



@app.route('/get_random_article/')
def get_random_article():
	return wiki.get_random_article_name()


@app.route('/del_file/<path:filename>')
def del_file(filename):
	os.remove(filename) #Full File path
	return "Removing: " + filename

@sockets.route('/echo')
def echo_socket(ws):
	while True:
		message = ws.receive()
		thread.start_new_thread(wiki.new_search, (ws, message, None,))

	

@app.route('/')
def index():
	return render_template('not_index.html')



#app.run(debug=True)

#if __name__ == "__main__":
#   from gevent import pywsgi
#    from geventwebsocket.handler import WebSocketHandler
#    server = pywsgi.WSGIServer(('', 5000), app, handler_class=WebSocketHandler)
#    server.serve_forever()
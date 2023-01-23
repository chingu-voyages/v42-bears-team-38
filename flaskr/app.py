from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

app = Flask(__name__)

app.config['SECRET_KEY']='034344fdfsdsdf544e161a7dd2d17fdae47f'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)
db.init_app(app)
ma = Marshmallow(app)

from models import *

from routes import *

from wrapper import *
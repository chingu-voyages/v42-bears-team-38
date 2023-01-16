from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config["DEBUG"] = True
db.init_app(app)
ma = Marshmallow(app)

from models import *

from routes import *
from flask import request, jsonify
from app import app
import jwt
from models import User
from functools import wraps

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        token = None
        
        if auth_header:
            token = auth_header.split(" ")[1]
        if not token:
            return jsonify({'message': 'a valid token is missing'}), 401
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'token is invalid'}), 401
        return f(current_user, *args, **kwargs)
    return decorator


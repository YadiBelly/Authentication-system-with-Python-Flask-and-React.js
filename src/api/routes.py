"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def sign_Up():

    data= request.get_json()
    send_data = User(email=data["email"], password=data["password"])
    db.session.add(send_data)
    db.session.commit()
    return jsonify({"msg":"user created"}), 200;

@api.route('/verifyUser', methods=['GET'])
@jwt_required()
def verify_User():
    data= request.get_json()
    currentUser = get_jwt_identity()
    user = User.query.filter_by(email=currentUser).first()
    return jsonify({"email":user.email}), 200;                             
    
@api.route('/login', methods=['POST'])
def login():
    data= request.get_json()
    if "email" not in data or data["email"]== "":
        raise APIException("email does not exist", status_code=400)
    if "password" not in data or data["password"]=="":
        raise APIException("password does not exist", status_code=400)
    user = User.query.filter_by(email=data["email"]).first()
    if user == None:
        raise APIException("user not found", status_code=404)
    if data["email"] != user.email:
        raise APIException("user not found", status_code=404)
    else:
        access_token=create_access_token(identity=user.email)
        return jsonify(access_token=access_token)
    return jsonify({"msg":"user created"}), 200;
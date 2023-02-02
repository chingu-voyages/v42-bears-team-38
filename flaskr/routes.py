from app import app, db
from flask import jsonify, request, make_response
from models import Patient, PatientSchema, Prescriber, PrescriberSchema, Prescription, PrescriptionSchema, Medication, User, UserSchema
from datetime import datetime, date, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from uuid import uuid4
import jwt
from flask_cors import cross_origin
from wrapper import token_required

import ssl
ssl._create_default_https_context = ssl._create_unverified_context
from fdaapi import getMedicationData

def user_data(current_user):
    if current_user.prescriber:
        return current_user.prescriber
    elif current_user.patient:
        return current_user.patient

# heroku server check
@app.route('/', methods=['GET'])
def route():
    return "server running", 200

#add patient information
@app.route('/addPatient', methods=['POST'])
@cross_origin()
def addPatient():
    data = request.get_json()
    patient = Patient(prefix=data['prefix'], dob=datetime.strptime(data['dob'], "%Y-%m-%d"), first_name=data['firstName'], last_name=data['lastName'], gender=data['gender'], city=data['city'], email=data['email'])
    db.session.add(patient)
    db.session.commit()
    return jsonify("User added"), 200

#add patient information
@app.route('/searchPatient', methods=['POST'])
@cross_origin()
@token_required
def searchPatient(current_user):
    search_email = request.get_json()
    patient_schema = PatientSchema()
    patient = Patient.query.filter_by(email=search_email).first()  
    return jsonify(patient_schema.dump(patient)), 200

#add perscriber information
@app.route('/addPrescriber', methods=['POST'])
@cross_origin()
@token_required
def addPrescriber(current_user):
    data = request.get_json()
    prescriber = Prescriber(prefix=data['prefix'], first_name=data['first_name'], last_name=data['last_name'], email=data['email'], position=data['position'])
    db.session.add(prescriber)
    db.session.commit()
    return jsonify("Prescriber added"), 200

#add prescription
@app.route('/addPrescription', methods=['POST'])
@cross_origin()
def addPresrciption():
    id = request.headers.get('id')
    data = request.get_json()
    medications = data['medication']
    listMeds = []
    script = Prescription(patient_id=data['patient_id'], prescriber_id=data['prescriber_id'], date=datetime.utcnow())
    listMeds.append(script)
    for medication in medications:
        if medication['repeat_review_date'] is not None:
            [year, month, day] = medication['repeat_review_date'].split("-")
            listMeds.append(Medication(drug_name=medication['drug_name'], dose=medication['dose'], form=medication['form'], frequency=medication['frequency'], route=medication['route'], duration=medication['duration'], repeat=medication['repeat'], repeat_review_date=date(int(year), int(month), int(day)), prescription=script))
        else:
            listMeds.append(Medication(drug_name=medication['drug_name'], dose=medication['dose'], form=medication['form'], frequency=medication['frequency'], route=medication['route'], duration=medication['duration'], repeat=medication['repeat'], prescription=script))
    db.session.add_all(listMeds)
    db.session.commit()
    return jsonify("Prescription Added"), 200

# this is just a route so we can see the data
@app.route('/list', methods=['GET'])
def list():
    patients = Patient.query.all()
    prescriber = Prescriber.query.all()
    patient_schema = PatientSchema(many=True)
    prescriber_schema = PrescriberSchema(many=True)
    prescriptions = Prescription.query.all()
    prescription_schema = PrescriptionSchema(many=True)
    users = User.query.all()
    users_schema = UserSchema(many=True)
    
    return jsonify({"patients": patient_schema.dump(patients), "prescribers": prescriber_schema.dump(prescriber), "prescriptions": prescription_schema.dump(prescriptions), "users": users_schema.dump(users)})

#provide a list of all prescriptions, calling medicine data from fdaapi
@app.route('/listPrescriptions', methods=['GET'])
def listprescriptions():
    prescriptions = Prescription.query.all()
    prescription_schema = PrescriptionSchema(many=True)
    ser_prescriptions = prescription_schema.dump(prescriptions)
    # this wont work without the product_nd - will revise what to send back
    # for prescription in ser_prescriptions:
    #     medications = prescription['medications']
    #     
    #     for medication in medications:
    #         med_data = getMedicationData(medication['product_ndc'])
            
    #         if isinstance(med_data, dict):
    #             medication['medication_data'] = med_data
    #         else:
    #             return med_data
            
    return jsonify(ser_prescriptions), 200

@app.route('/register', methods=['POST'])
@cross_origin()
def signup_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(public_id=str(uuid4()), password=hashed_password, role='prescriber', email=data['email'])
    if new_user.role == 'prescriber':
        new_prescriber = Prescriber(prefix=data['prefix'], first_name=data['firstName'], last_name=data['lastName'], position='consultant', user_id = new_user.id,)
        new_user.prescriber = new_prescriber
        db.session.add(new_prescriber)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'registered successfully'}), 200

@app.route('/login', methods=['POST'])
@cross_origin()
def login_user():
    auth = request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('could not verify', 401, {'Authentication': 'login required"'})   
    user = User.query.filter_by(email=auth.username).first()
    if check_password_hash(user.password, auth.password):
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.utcnow() + timedelta(minutes=90)}, app.config['SECRET_KEY'], "HS256")
        data = user_data(user)
        return jsonify({'token' : token, 'userInfo': {'id': user.public_id, 'role': user.role, 'firstName': data.first_name, "lastName": data.last_name, 'email': user.email}}), 200
    return make_response('could not verify',  401, {'Authentication': '"login required"'})

@app.route('/getUser', methods=['GET'])
@cross_origin()
@token_required
def get_user_data(current_user):
    data = user_data(current_user)
    return make_response({"id": current_user.public_id, "firstName": data.first_name, "lastName": data.last_name, "email": current_user.email, "role": current_user.role}, 200)
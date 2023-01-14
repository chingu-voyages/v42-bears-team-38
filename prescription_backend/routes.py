from app import app, db
from flask import jsonify, request
from models import Patient, PatientSchema, Prescriber, PrescriberSchema, Prescription, PrescriptionSchema, Medication, MedicationSchema
from datetime import datetime, date

import ssl
ssl._create_default_https_context = ssl._create_unverified_context
from fdaapi import getMedicationData

# heroku server check
@app.route('/', methods=['GET'])
def route():
    return jsonify("Server running"), 200

#add patient information
@app.route('/addPatient', methods=['POST'])
def addPatient():
    data = request.get_json()
    patient = Patient(prefix=data['prefix'], dob=datetime.strptime(data['dob'], "%Y-%m-%d"), first_name=data['first_name'], last_name=data['last_name'], gender=data['gender'], city=data['city'], email=data['email'], last_updated=datetime.utcnow())
    db.session.add(patient)
    db.session.commit()
    return jsonify("User added"), 200

#add perscriber information
@app.route('/addPrescriber', methods=['POST'])
def addPrescriber():
    data = request.get_json()
    prescriber = Prescriber(prefix=data['prefix'], first_name=data['first_name'], last_name=data['last_name'], email=data['email'], position=data['position'], last_updated=datetime.utcnow())
    db.session.add(prescriber)
    db.session.commit()
    return jsonify("Prescriber added"), 200

#add perscription
@app.route('/addPrescription', methods=['POST'])
def addPersrciption():
    id = request.headers.get('id')
    data = request.get_json()
    medications = data['medication']
    listMeds = []
    script = Prescription(patient_id=data['patient_id'], prescriber_id=data['prescriber_id'], date=datetime.utcnow())
    listMeds.append(script)
    for medication in medications:
        if medication['repeat_review_date'] is not None:
            [year, month, day] = medication['repeat_review_date'].split("-")
            listMeds.append(Medication(product_ndc=medication['product_ndc'], dose=medication['dose'], frequency=medication['frequency'], route=medication['route'], duration=medication['duration'], repeat=medication['repeat'], repeat_review_date=date(int(year), int(month), int(day)), prescription=script))
        else:
            listMeds.append(Medication(product_ndc=medication['product_ndc'], dose=medication['dose'], frequency=medication['frequency'], route=medication['route'], duration=medication['duration'], repeat=medication['repeat'], prescription=script))
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
    
    return jsonify({"patients": patient_schema.dump(patients), "prescribers": prescriber_schema.dump(prescriber), "prescriptions": prescription_schema.dump(prescriptions)})

#provide a list of all prescriptions, calling medicine data from fdaapi
@app.route('/listPrescriptions', methods=['GET'])
def listprescriptions():
    prescriptions = Prescription.query.all()
    prescription_schema = PrescriptionSchema(many=True)
    ser_prescriptions = prescription_schema.dump(prescriptions)
    for prescription in ser_prescriptions:
        medications = prescription['medications']
        for medication in medications:
            med_data = getMedicationData(medication['product_ndc'])
            
            if isinstance(med_data, dict):
                medication['medication_data'] = med_data
            else:
                return med_data
            
    return jsonify(ser_prescriptions), 200


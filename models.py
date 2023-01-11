from app import db, ma, app
from marshmallow import fields

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prefix = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(50), nullable=False)
    city = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), unique=True)
    last_updated = db.Column(db.Date, nullable=False)

class Prescriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prefix = db.Column(db.String(30), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    position = db.Column(db.String(255), nullable=False)
    last_updated = db.Column(db.Date, nullable=False)
    
class Prescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'))
    patient = db.relationship('Patient', backref='perscription')
    date = db.Column(db.Date, nullable=False)
    prescriber_id = db.Column(db.Integer, db.ForeignKey('prescriber.id'))
    prescriber = db.relationship('Prescriber', backref="prescription")
    medications = db.relationship("Medication", backref="prescription")

class Medication(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_ndc = db.Column(db.String(50), nullable=False)
    dose = db.Column(db.Integer)
    frequency = db.Column(db.Integer)
    route = db.Column(db.String(100))
    duration = db.Column(db.Integer)
    repeat = db.Column(db.Boolean, default=False, nullable=False)
    repeat_review_date = db.Column(db.Date, nullable=True)
    perscription_id = db.Column(db.Integer, db.ForeignKey('prescription.id'))

class PatientSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Patient

    id = ma.auto_field()
    prefix = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    dob = ma.auto_field()
    gender = ma.auto_field()
    email = ma.auto_field()
    last_updated = ma.auto_field()

class PrescriberSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Prescriber

    id = ma.auto_field()
    prefix = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    position = ma.auto_field()
    last_updated = ma.auto_field()

class MedicationSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Medication
        include_relationships = True
        include_fk = True
    
    id = ma.auto_field()
    product_ndc = ma.auto_field()
    dose = ma.auto_field()
    frequency = ma.auto_field()
    route = ma.auto_field()
    duration = ma.auto_field()
    perscription_id = ma.auto_field()
    repeat = ma.auto_field()
    repeat_review_date = ma.auto_field()

class PrescriptionSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Prescription
        include_relationships = True
        include_fk = True

    id = ma.auto_field()
    patient_id = ma.auto_field()
    patient = fields.Nested(PatientSchema)
    date= ma.auto_field()
    prescriber_id = ma.auto_field()
    prescriber = fields.Nested(PrescriberSchema)
    medications = fields.List(fields.Nested(MedicationSchema))

with app.app_context():
    db.create_all()


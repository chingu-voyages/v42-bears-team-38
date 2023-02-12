# Prescription Application

The prescription application allows a prescriber, such as a physician or nurse practitioner, to create a prescription for a patient. Multiple drugs per prescription are supported. The appropriate dosage, route, and form can be specified per drug, as well as the duration of the prescription.

## Usage
Hosted at:
[Prescription Manager](https://prescription-manager.vercel.app/)

To use the application, you must create an account or use the test credentials provided below. Visit the sign-up page to create an account.

Test credentials:

- Username: steven@gmail.com
- Password: 1234

After creating account, visit the log in page to login.

You can perform any of the following actions:

- Add a patient
- Find a patient
- Create a new prescription
- Find an existing prescription

## Technologies

This project involves the following technologies:

- ReactJS
- Redux Toolkit
- Flask
- SQL Alchemy

## Installation

You can install the application locally by completing the following steps:

**Frontend**

To run locally frontend:

1. clone repo
1. npm install
1. npm run dev

**Backend**

To run locally backend:

1. python -m venv flaskr/env
1. source flaskr/env/bin/activate
1. pip install -r requirements.txt
1. cd flaskr
1. flask run

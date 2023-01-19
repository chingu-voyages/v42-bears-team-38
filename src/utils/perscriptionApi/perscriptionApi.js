import axios from 'axios';
import { backendURL } from '../store/Auth/authActions';

export const addPatient = async patientData => {
	try {
		// configure header's Content-Type as JSON
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await axios.post(
			`${backendURL}/addPatient`,
			patientData,
			config
		);

		return response.data;
	} catch (error) {
		// return custom error message from API if any
		throw new Error(`Not able to add new patient: ${error}`);
	}
};

export const searchPatient = async email => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const response = await axios.post(
			`${backendURL}/searchPatient`,
			email,
			config
		);

		return response.data;
	} catch (error) {
		throw new Error(`Unable to search for patient  ${error}`);
	}
};

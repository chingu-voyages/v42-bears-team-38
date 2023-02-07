import axios from "axios";
import { backendURL } from "../store/Auth/authActions";

export const setHeader = () => {
  axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
};

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const addPatient = async (patientData) => {
  try {
    // configure header's Content-Type as JSON
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

export const searchPatient = async (email) => {
  try {
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

export const addPrescription = async (data) => {
  try {
    const response = await axios.post(
      `${backendURL}/addPrescription`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error() * `Unable to add new prescription ${error}`;
  }
};

export const listPrescriptions = async () => {
  try {
    const response = await axios.get(`${backendURL}/listPrescriptions`, config);

    return response.data;
  } catch (error) {
    throw new Error() * `Unable to add new prescription ${error}`;
  }
};

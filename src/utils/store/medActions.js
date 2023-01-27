import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Generic name search, which is different than the brand name search
// https://api.fda.gov/drug/ndc.json?search=generic_name:"dicyclomine"&limit=10
// This API returns a 404 status code if no data is found, which causes a rejected
// Promise.

export const queryApi = createAsyncThunk('medications/queryApi', async (drugName = '') => {
  const api = axios.create({
    baseURL: 'https://api.fda.gov/drug/'
  });

  let response;
  // createAsyncThunk includes rejection error handling
  // https://redux-toolkit.js.org/api/createAsyncThunk#handling-thunk-errors
  try {
    response = await api.get(`ndc.json?limit=25&search=generic_name:"${drugName}"`);
  }
  // Catch or allow thunk to handle unhandled Promise exception?
  catch(err) {
    if(err.response) {
      return rejectWithValue(err.response.data)
    }
    throw(err);
  }

  return response.data;
  // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
  /*
  const data = await import ('../../lib/mocks/fda-ndc-generic.json').then(module => module.default);
  return new Promise(async function(resolve, reject) {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
  */
});

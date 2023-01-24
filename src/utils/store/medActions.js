import { createAsyncThunk } from '@reduxjs/toolkit';

// Generic name search, which is different than the brand name search
// https://api.fda.gov/drug/ndc.json?search=generic_name:"dicyclomine"&limit=10
// async file load
export const queryApi = createAsyncThunk('medications/queryApi', async () => {
  // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
  const data = await import ('../../lib/mocks/fda-ndc-generic.json').then(module => module.default);
  return new Promise(async function(resolve, reject) {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
});

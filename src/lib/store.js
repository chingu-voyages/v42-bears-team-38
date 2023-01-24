import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
  medications: [],
  status: 'idle',
  error: null
}

// Generic name search, which is different than the brand name search
// https://api.fda.gov/drug/ndc.json?search=generic_name:"dicyclomine"&limit=10
// async file load
export const queryApi = createAsyncThunk('medications/queryApi', async () => {
  // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
  const data = await import ('./mocks/fda-ndc-generic.json').then(module => module.default);
  return new Promise(async function(resolve, reject) {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
});

export const medSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(queryApi.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(queryApi.fulfilled, (state, action) => {
      const { results } = action.payload;
      state.status = 'succeeded';

      const drugNames = [ ...new Set(results.map(obj => obj.generic_name.toLowerCase())) ];
      const formAndRouteByDrugName = results.reduce((accum, drugResult) => {
        const { generic_name: drugName, dosage_form: drugForm, route: drugRoutes } = drugResult;
        if(!accum.hasOwnProperty(drugName.toLowerCase())) accum[drugName.toLowerCase()] = {
          routes: [],
          forms: []
        };

        accum[drugName.toLowerCase()].routes.push(...drugRoutes);
        accum[drugName.toLowerCase()].forms.push(drugForm);

        return accum;
      }, {});

      state.medications = {
        drugNames,
        formAndRouteByDrugName
      };
    })
    .addCase(queryApi.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export default function createStore() {
  return configureStore({
    initialState,
    reducer: {
      medications: medSlice.reducer
    }
  });
}

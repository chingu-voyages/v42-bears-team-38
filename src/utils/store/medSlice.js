import { createSlice } from '@reduxjs/toolkit';

import { queryApi } from './medActions';

export const initialState = {
  medications: [],
  status: 'idle',
  error: null
}

const medSlice = createSlice({
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
      /*
      const formAndRouteByDrugName = results.reduce((accum, drugResult) => {
        const { generic_name: drugName, dosage_form: drugForm, route: drugRoutes } = drugResult;
        if(!accum.hasOwnProperty(drugName.toLowerCase())) accum[drugName.toLowerCase()] = {
          routes: [],
          forms: []
        };

        // drugRoutes can be undefined
        accum[drugName.toLowerCase()].routes.push(...(drugRoutes ? drugRoutes : []));
        accum[drugName.toLowerCase()].forms.push(drugForm);

        return accum;
      }, {});
      */

      state.medications = {
        drugNames
      };
    })
    .addCase(queryApi.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export default medSlice.reducer;

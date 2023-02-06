import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patient: null,
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.patient = action.payload;
    },
    clearPatient: (state) => {
      state.patient = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPatient, clearPatient } = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
  medications: [],
  status: 'idle',
  error: null
}

// https://api.fda.gov/drug/ndc.json?search=generic_name:"dicyclomine"&limit=10
// async file load
export const queryApi = createAsyncThunk('medications/queryApi', async () => {
  const data  = await new Promise(function(resolved, rejected) {
    setTimeout(() => {
      resolved('test value');
    }, 1000);
  });
  return Promise.resolve(data);
});

export const medSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    /* no op */
    medicationQueried: (state, action) => {
      const { payload } = action;
      state = payload;
      console.log(state);
      //const task = state.tasks.findIndex((task) => task.id === id);
      //if (task >= 0) {
      //  state.tasks[task].state = newTaskState;
      //}
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryApi.pending, (state, action) => {
      state.status = 'loading';
    })
    .addCase(queryApi.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.medications = [ ...action.payload ];
    })
    .addCase(queryApi.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

// export const { updateTaskState } = TasksSlice.actions;
// Probably irrelevant
export const { medicationQueried } = medSlice.actions;

export default function createStore() {
  return configureStore({
    initialState,
    reducer: {
      medications: medSlice.reducer
    }
  });
}

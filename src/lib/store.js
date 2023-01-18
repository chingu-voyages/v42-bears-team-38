import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {

};

export const medSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
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
});

// export const { updateTaskState } = TasksSlice.actions;
export const { medicationQueried } = medSlice.actions;

const store = configureStore({
  reducer: {
    medications: medSlice.reducer,
  },
});

export default store;

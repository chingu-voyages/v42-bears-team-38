
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { initialState as medInitialState } from '../lib/store';
import medSliceReducer from '../utils/store/medSlice';

import DrugSearch from '../components/DrugSearch';

const store  = configureStore({
  medInitialState,
  reducer: {
    medications: medSliceReducer
  }
});
const Mockstore = ({ medState, children }) => (
  <Provider store={store}
  >
    {children}
  </Provider>
);

export default {
  component: DrugSearch,
}

const Template = args => <DrugSearch { ...args } />

export const Default = Template.bind({});
Default.args = { debug: true };

Default.decorators = [
  (story) => <Provider store={store}>{story()}</Provider>,
];

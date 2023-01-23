
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';

import { initialState as medInitialState } from '../lib/store';
import createStore from '../lib/store';

import DrugSearch from '../components/DrugSearch';

// TODO
// Can't mock initialData this way, however. Need to return a fn()
// from the store to manage setup instead.
const store  = createStore();
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

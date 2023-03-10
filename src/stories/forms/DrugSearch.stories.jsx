import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Form } from 'informed';

import { initialState as medInitialState } from '../../utils/store/medSlice';
import medSliceReducer from '../../utils/store/medSlice';

import DrugSearch from '../../components/DrugSearch';

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
  (story) => {
    return (
      <Provider store={store}>
        <Form>
          {story()}
        </Form>
      </Provider>
    );
  },
];

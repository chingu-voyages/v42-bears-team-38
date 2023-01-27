import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { initialState as medInitialState } from '../../utils/store/medSlice';
import medSliceReducer from '../../utils/store/medSlice';

import BasicForm from '../../components/BasicForm';

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
  component: BasicForm,
}

const Template = args => <BasicForm { ...args } />

export const Empty = Template.bind({});
Empty.decorators = [
  (story) => <Provider store={store}>{story()}</Provider>,
];

export const Data = Template.bind({});
Data.decorators = [
  (story) => <Provider store={store}>{story()}</Provider>,
];
Data.args = {
  initialValue: {
    'prescriptionDate': '20220101',
    "medications": [
      {
        "allowSubstitutions": true,
        "drugForm": "oral",
        "drugRoute": "intravenous"
      },
      {
        "allowSubstitutions": false,
        "refills": "22"
      }
    ]
  }
};

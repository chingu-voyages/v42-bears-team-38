import React from 'react';

import BasicForm from '../components/BasicForm';

export default {
  component: BasicForm,
}

const Template = args => <BasicForm { ...args } />

export const Empty = Template.bind({});

export const Data = Template.bind({});
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

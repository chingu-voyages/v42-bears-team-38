import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Input, ArrayField, useArrayFieldItemState, RadioGroup, Radio, Select, Option, Debug } from 'informed';

import { backendURL } from '../utils/store/Auth/authActions';
import DrugSearch from './DrugSearch';

const api = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  }
});

// TODO - Use RTK Query instead
// This approach is most expedient, but inconsistent with ideal practice.
const onSubmit = async ({ values }) => {
  const payload = { ...values };

  try {
    api.post('/addPrescription', values);
  }
  catch(err) {
    console.error(err.message);
    return false;
  }
};

// TODO - Accept patientId and prescriberId as props
export default function BasicForm({ initialValues, patientId = 1, prescriberId = 1 }) {
  const FieldState = () => {
    const { values } = useArrayFieldItemState();
    return (
      <pre>
        <code>{JSON.stringify(values, null, 2)}</code>
      </pre>
    );
  };

  return (
    <Form onSubmit={onSubmit} autocomplete="off" style={{width: '50%', margin: '0 auto'}} initialValues={initialValues}>
      <Input name='patient_id' type='hidden' initialValue={patientId} />
      <Input name='prescriber_id' type='hidden' initialValue={prescriberId} />

      <ArrayField name='medication'>
      {({ add }) => (
          <>

          <button
            onClick={() => {
              add();
            }}
            type="button">
            Add
          </button>

          <ArrayField.Items>
            {() => (
              <>
                <DrugSearch debug />

                {/*TODO: Furnish this complete this.*/}
                <Select name='form' label='Form' defaultValue={''}>
                  <Option value='' disabled>Select</Option>
                  <Option value='oral'>Pill</Option>
                  <Option value='intravenous'>Tablet</Option>
                </Select>

                {/*TODO: Furnish this complete this.*/}
                <Select name='route' label='Route' defaultValue={''}>
                  <Option value='' disabled>Select</Option>
                  <Option value='oral'>Oral</Option>
                  <Option value='intravenous'>Intravenous</Option>
                </Select>

                <Input name='dose' label='Dosage' defaultValue={''} />
                <Input name='duration' label='Duration' defaultValue={''} />
                <Input name='frequency' label='Frequency' defaultValue={''} />
                <Input name='quantity' label='Quantity' defaultValue={''} />
                <Input name ='refills' label='Refills 'defaultValue={''} />

                <RadioGroup name='allowSubstitutions' defaultValue={false}>
                  <Radio value={true} label='Substitution permitted' />
                  <Radio value={false} label='Dispense as written' />
                </RadioGroup>

                {/*TODO: If empty string, backend emits Traceback */}
                <Input name='repeat_review_date' label='Review date' defaultValue={'1900-01-01'} />

                <FieldState />
              </>
            )}
            </ArrayField.Items>
          </>
        )}
      </ArrayField>

      <button type="submit">Submit</button>
      <Debug values />
    </Form>
  );
}

BasicForm.propTypes = {
  initialValues: PropTypes.object,
  patientId: PropTypes.number,
  prescriberId: PropTypes.number
};

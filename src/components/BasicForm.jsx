import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, ArrayField, useArrayFieldItemState, RadioGroup, Radio, Select, Option, Debug } from 'informed';

import DrugSearch from './DrugSearch';

const onSubmit = ({ values }) => {
  window.alert(JSON.stringify(values, null, 2));
};

// TODO - Accept patientId and prescriberId as props
export default function BasicForm({ initialValues }) {
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
      <Input name='prescriptionDate' label='Prescription date' />
      <Input name='patient_id' type='hidden' value={1} />
      <Input name='prescriber_id' type='hidden' value={2} />

      <ArrayField name='medications'>
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
                <Select name='form' label='Form'>
                  <Option value='' disabled>Select</Option>
                  <Option value='oral'>Pill</Option>
                  <Option value='intravenous'>Tablet</Option>
                </Select>

                {/*TODO: Furnish this complete this.*/}
                <Select name='route' label='Route'>
                  <Option value='' disabled>Select</Option>
                  <Option value='oral'>Oral</Option>
                  <Option value='intravenous'>Intravenous</Option>
                </Select>

                <Input name='dose' label='Dosage' />
                <Input name='duration' label='Duration' />
                <Input name='frequency' label='Frequency' />
                <Input name='quantity' label='Quantity' />
                <Input name ='refills' label='Refills '/>

                <RadioGroup name='allowSubstitutions' defaultValue={false}>
                  <Radio value={true} label='Substitution permitted' />
                  <Radio value={false} label='Dispense as written' />
                </RadioGroup>

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
  initialValues: PropTypes.object
};

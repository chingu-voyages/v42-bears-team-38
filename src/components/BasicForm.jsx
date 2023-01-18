import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, ArrayField, useArrayFieldItemState, RadioGroup, Radio, Select, Option, Debug } from 'informed';

const onSubmit = ({ values }) => {
  window.alert(JSON.stringify(values, null, 2));
};

/* TODO
Include
- What to dispense
- Quantity to dispense
- Unit/Form that the drug takes, pill, ect.
- Route, such as oral, intravenous ect.
- Refills
- Substitutions boolean
*/

export default function MyForm({ initialValues }) {
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
                <Input name='drugName' label='Drug name' />

                <Select name='drugForm' label='Form'>
                  <Option value='' disabled>Select</Option>
                  <Option value='oral'>Pill</Option>
                  <Option value='intravenous'>Tablet</Option>
                </Select>

                <Select name='drugRoute' label='Route'>
                  <Option value='' disabled>Select</Option>
                  <Option value='oral'>Oral</Option>
                  <Option value='intravenous'>Intravenous</Option>
                </Select>

                <Input name='duration' label='Duration' />
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

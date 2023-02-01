// TODO - Refactor this into BasicForm.DrugSearch because it absolutely
// won't work properly without being used from inside an Informed Form.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Input, useFormApi, useFieldApi, Select, Option, Debug, Relevant } from 'informed';

import { queryApi } from '../utils/store/medActions';

const SearchCombo = () => {
  const dispatch = useDispatch();
  const formApi = useFormApi();
  const fieldApi = useFieldApi('search');

  const drugs = useSelector(state => state.medications.medications.drugNames);

  const onSearch = () => {
    // Gets the field value, even inside of <ArrayField.Items />
    const drugName = fieldApi.getValue('search');
    dispatch(queryApi(drugName));
  };

/* TODO - This doesn't work inside <ArrayField.Items>
<Relevant when={({ formState }) => !!formState.values?.search}>
</Relevant>
*/

  return (
    <>
      <Input name='search' label='Drug name' />
      <button type='button' name='run_query' onClick={onSearch}>Search</button>
      <Select name='drug_name' label='Drug names'>
        <Option value="" disabled>
          -Select-
        </Option>
        {(drugs || []).map(name => <Option key={name} value={name}>{name}</Option>)}
      </Select>
    </>
  );
};

// This must be a child of { Form } from 'informed'
export default function DrugSearch({ debug }) {
  const medications = useSelector(state => state.medications.medications);

  return (
    <>
      <SearchCombo />

      <Relevant when={() => debug}>
        <Debug values />
        <pre>
          <code>{JSON.stringify(medications, null, 2)}</code>
        </pre>
      </Relevant>
    </>
  );
}

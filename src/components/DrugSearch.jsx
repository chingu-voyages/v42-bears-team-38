import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, useFormApi, Select, Option, Debug, useFieldState, Relevant } from 'informed';

import { queryApi } from '../utils/store/medActions';

const SearchCombo = () => {
  const dispatch = useDispatch();
  const formApi = useFormApi();

  const status = useSelector(state => state.medications.status);
  const drugs = useSelector(state => state.medications.medications.drugNames);

  useEffect(() => {
    formApi.setValue('status', status);
  });

  const onSearch = () => {
    const drugName = formApi.getValue('search');
    dispatch(queryApi(drugName));
  };

  return (
    <>
      <Input name='search' label='Drug name' />
      <button type='button' name='run_query' onClick={onSearch}>Search</button>
      <Input name='status' label='Status' />
      <Relevant when={({ formState }) => !!formState.values?.search}>
        <Select name='drugName' label='Drug names'>
          <option value="" disabled>
            -Select-
          </option>
          {(drugs || []).map(name => <option key={name} value={name}>{name}</option>)}
        </Select>
      </Relevant>
    </>
  );
};

export default function DrugSearch({ debug }) {
  const medications = useSelector(state => state.medications.medications);

  return (
    <Form>
      <SearchCombo />

      <Relevant when={() => debug}>
        <Debug values />
        <pre>
          <code>{JSON.stringify(medications, null, 2)}</code>
        </pre>
      </Relevant>
    </Form>
  );
}

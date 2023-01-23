import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, ArrayField, useFormApi, useArrayFieldItemState, Select, Option, Debug, useFieldState, Relevant } from 'informed';

import { medicationQueried, queryApi } from '../lib/store';

const SearchCombo = () => {
  const dispatch = useDispatch();
  const formApi = useFormApi();

  const status = useSelector(state => state.medications.status);

  useEffect(() => {
    formApi.setValue('status', status);
  });

  const onSearch = () => {
    const drugName = formApi.getValue('search');
    //dispatch(medicationQueried(drugName));
    dispatch(queryApi()).then(x => console.log(x));
  };

  return (
    <>
      <Input name='search' label='Drug name' />
      <button type='button' name='run_query' onClick={onSearch}>Search</button>
      <Input name='status' label='Status' />
    </>
  );
};

export default function DrugSearch({ debug }) {
  return (
    <Form>
      <SearchCombo />

      <Relevant when={() => debug}>
        <Debug values />
      </Relevant>
    </Form>
  );
}

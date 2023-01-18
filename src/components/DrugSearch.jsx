import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, ArrayField, useFormApi, useArrayFieldItemState, Select, Option, Debug, useFieldState, Relevant } from 'informed';

import { medicationQueried } from '../lib/store';

const SearchCombo = () => {
  const dispatch = useDispatch();
  const formApi = useFormApi();

  const onSearch = () => {
    const drugName = formApi.getValue('search');
    dispatch(medicationQueried(drugName));
  };

  return (
    <>
      <Input name='search' label='Drug name' />
      <button type='button' name='run_query' onClick={onSearch}>Search</button>
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

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
//import { Button } from "../../stories/button/Button";
//import { Input } from "../../stories/input/Input";
import { Button, TextInput, FormGroup } from "@patternfly/react-core";

import { searchPatient } from "../../utils/perscriptionApi/perscriptionApi";
import { setPatient } from "../../utils/store/prescriptionSlice";
import "./findPatient.css";

const FindPatient = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const dispatch = useDispatch();
  const patient = useSelector(state => state.prescription.patient);

  const handleSearch = async () => {
    const patientData = await searchPatient(searchEmail);
    dispatch(setPatient(patientData));
  };

  return (
    <>
      <form>
        <FormGroup label="E-mail" isRequired>
          <TextInput
            id='search-email'
            type="text"
            value={searchEmail}
            onChange={setSearchEmail}
            icon={<AiOutlineSearch />}
          />
        </FormGroup>
        <Button onClick={handleSearch}>Search</Button>
      </form>
      {patient && <div>{JSON.stringify(patient, null, 2)}</div>}
    </>
  );
};

export default FindPatient;

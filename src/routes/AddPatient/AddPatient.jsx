import React, { useState } from "react";
import { Input } from "../../stories/input/Input";
import { Form, FormGroup, TextInput, Button } from '@patternfly/react-core';
import { addPatient } from "../../utils/perscriptionApi/perscriptionApi";
import "./addPatient.css";

const AddPatient = () => {
  const todayDate = new Date().toISOString().slice(0, 10);

  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(todayDate);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (prefix && firstName && lastName && gender && city && email) {
      addPatient({ prefix, firstName, lastName, dob, gender, city, email });
    }
  };

  return (
    <section>
      <Form>
        <FormGroup label="Prefix">
          <TextInput id='prefix' type='text' value={prefix} onChange={setPrefix} />
        </FormGroup>
        <FormGroup label="First Name" isRequired>
          <TextInput id='first_name' type='text' value={firstName} onChange={setFirstName} />
        </FormGroup>
        <FormGroup label="Last Name" isRequired>
          <TextInput id='last_name' type='text' value={lastName} onChange={setLastName} />
        </FormGroup>

        <Input id='dob' label="D.O.B" value={dob} onChange={setDob} type="date" />

        <FormGroup label="gender" isRequired>
          <TextInput id= 'gender' type='text' value={gender} onChange={setGender} />
        </FormGroup>
        <FormGroup label="city" isRequired>
          <TextInput id='city' type='text' value={city} onChange={setCity} />
        </FormGroup>
        <FormGroup label="email" isRequired>
          <TextInput id='email' type='text' value={email} onChange={setEmail} />
        </FormGroup>

        <Button id='button' onClick={handleSubmit}>Add</Button>
      </Form>
    </section>
  );
};

export default AddPatient;

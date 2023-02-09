import React, { useState } from "react";
import ButtonSpacer from "../../components/ButtonSpacer";
import { Button } from "../../stories/button/Button";
import { Input } from "../../stories/input/Input";
import { addPatient } from "../../utils/perscriptionApi/perscriptionApi";
import { IoArrowBackSharp } from "react-icons/io5";
import "./addPatient.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

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
      <div className="screenContainer">
        <BackButton />
        <Input label="Prefix" value={prefix} onChange={setPrefix} />
        <Input label="First Name" value={firstName} onChange={setFirstName} />
        <Input label="Last Name" value={lastName} onChange={setLastName} />
        <Input label="D.O.B" value={dob} onChange={setDob} type="date" />
        <Input label="gender" value={gender} onChange={setGender} />
        <Input label="city" value={city} onChange={setCity} />
        <Input label="email" value={email} onChange={setEmail} />
        <ButtonSpacer />
        <Button label="Add" onClick={handleSubmit} />
      </div>
    </section>
  );
};

export default AddPatient;

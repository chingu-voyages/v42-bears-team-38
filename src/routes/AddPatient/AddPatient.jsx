import React, { useState } from "react";
import ButtonSpacer from "../../components/ButtonSpacer";
import { Button } from "../../stories/button/Button";
import { Input } from "../../stories/input/Input";
import { addPatient } from "../../utils/perscriptionApi/perscriptionApi";
import "./addPatient.css";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const todayDate = new Date().toISOString().slice(0, 10);
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(todayDate);
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (prefix && firstName && lastName && gender && city && email) {
      const response = await addPatient({
        prefix,
        firstName,
        lastName,
        dob,
        gender,
        city,
        email,
      });
      if (response === "User added") {
        navigate("/");
      } else {
        setMessage("Unable to add patient");
      }
    } else {
      setMessage("Please complete all fields");
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
        {message && <p className="errorMessage">{message}</p>}
      </div>
    </section>
  );
};

export default AddPatient;

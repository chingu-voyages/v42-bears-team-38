import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import ButtonSpacer from "../../components/ButtonSpacer";
import { Button } from "../../stories/button/Button";
import { Input } from "../../stories/input/Input";
import { searchPatient } from "../../utils/perscriptionApi/perscriptionApi";
import { setPatient } from "../../utils/store/prescriptionSlice";
import "./findPatient.css";
import PatientData from "../../components/PatientData";
import BackButton from "../../components/BackButton";

const FindPatient = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const patientData = await searchPatient(searchEmail);

    if (patientData && Object.keys(patientData).length == 0) {
      setMessage("No patient found");
      dispatch(setPatient(null));
    } else {
      setMessage("");
      dispatch(setPatient(patientData));
    }
  };

  const { patient } = useSelector((state) => state.prescription);

  return (
    <section>
      <div className="screenContainer">
        <BackButton />
        <Input
          value={searchEmail}
          onChange={setSearchEmail}
          label="E-mail"
          icon={<AiOutlineSearch />}
        />
        <ButtonSpacer />
        <Button label="Search" onClick={handleSearch} />
        {message && <p className="error">{message}</p>}
        {patient && <PatientData patient={patient} />}
      </div>
    </section>
  );
};

export default FindPatient;

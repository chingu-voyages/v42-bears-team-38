import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Button } from "../../stories/button/Button";
import { Input } from "../../stories/input/Input";
import { searchPatient } from "../../utils/perscriptionApi/perscriptionApi";
import { setPatient } from "../../utils/store/prescriptionSlice";
import "./findPatient.css";

const FindPatient = () => {
  const [searchEmail, setSearchEmail] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    const patientData = await searchPatient(searchEmail);
    dispatch(setPatient(patientData));
  };

  return (
    <>
      <Input
        value={searchEmail}
        onChange={setSearchEmail}
        label="E-mail"
        icon={<AiOutlineSearch />}
      />
      <Button label="Search" onClick={handleSearch} />
    </>
  );
};

export default FindPatient;

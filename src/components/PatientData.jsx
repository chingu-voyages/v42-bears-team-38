import React from "react";
import { GrClear } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { Button } from "../stories/button/Button";
import { Input } from "../stories/input/Input";
import { clearPatient } from "../utils/store/prescriptionSlice";
import "./patientData.css";

const PatientData = ({ patient, searchable }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="patientData">
        <Input value={patient.first_name} disabled label="First Name" />
        <Input value={patient.last_name} disabled label="Last Name" />
        <Input value={patient.dob} disabled label="D.O.B" />
      </div>
      {searchable && (
        <Button label={<GrClear />} onClick={() => dispatch(clearPatient())} />
      )}
    </>
  );
};

export default PatientData;

PatientData.defaultProps = {
  patient: null,
  searchable: true,
};

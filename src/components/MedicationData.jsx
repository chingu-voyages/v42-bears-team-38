import React from "react";
import { Input } from "../stories/input/Input";
import "./medicationData.css";

const MedicationData = ({ med }) => {
  return (
    <div className="medData">
      <Input disabled value={med.drug_name} label="name" />
      <Input disabled value={med.dose} label="dose" />
      <Input disabled value={med.frequency} label="frequency" />
      <Input disabled value={med.repeat} label="repeat" />
    </div>
  );
};

export default MedicationData;

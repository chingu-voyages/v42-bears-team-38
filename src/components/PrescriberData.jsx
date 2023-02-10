import React from "react";
import { Input } from "../stories/input/Input";

const PrescriberData = ({ prescriber }) => {
  return (
    <>
      <div className="patientData">
        <Input value={prescriber.prefix} disabled label="Pefix" />
        <Input value={prescriber.first_name} disabled label="First Name" />
        <Input value={prescriber.last_name} disabled label="Last Name" />
        <Input value={prescriber.position} disabled label="Position" />
      </div>
    </>
  );
};

export default PrescriberData;

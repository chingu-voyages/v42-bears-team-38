import { Input } from "../stories/input/Input";
import "./prescriptionForm.css";

const PrescriptionData = ({ prescription }) => {
  return (
    <div>
      <Input
        disabled
        type="date"
        value={prescription.date}
        label="Presribed date"
      />
    </div>
  );
};

export default PrescriptionData;

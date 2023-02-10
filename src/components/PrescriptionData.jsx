import { Input } from "../stories/input/Input";
import "./prescriptionData.css";

const PrescriptionData = ({ prescription }) => {
  return (
    <div>
      <div className="prescriptionDate">
        <Input
          disabled
          type="date"
          value={prescription.date}
          label="Presribed date"
        />
        <Input disabled type="text" value={prescription.id} label="ID" />
      </div>
    </div>
  );
};

export default PrescriptionData;

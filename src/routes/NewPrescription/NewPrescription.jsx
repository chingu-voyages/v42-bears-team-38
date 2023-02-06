import "./newPrescription.css";
import BasicForm from "../../components/BasicForm";
import FindPatient from "../FindPatient/FindPatient";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../stories/button/Button";
import { Input } from "../../stories/input/Input";
import { clearPatient } from "../../utils/store/prescriptionSlice";
import { GrClear } from "react-icons/gr";
import Dropdown from "../../stories/dropdown/Dropdown";
import PrescriptionForm from "../../components/PrescriptionForm";

const NewPrescription = () => {
  const { patient } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Patient Details</h3>
      {!patient ? (
        <FindPatient />
      ) : (
        <>
          <div className="patientData">
            <Input value={patient.first_name} disabled label="First Name" />
            <Input value={patient.last_name} disabled label="Last Name" />
            <Input value={patient.dob} disabled label="D.O.B" />
          </div>
          <Button
            label={<GrClear />}
            onClick={() => dispatch(clearPatient())}
          />
        </>
      )}

      <div className="prescriptionBlock">
        <h3>Prescriptions</h3>

        <PrescriptionForm />
      </div>
    </>
  );
};

export default NewPrescription;

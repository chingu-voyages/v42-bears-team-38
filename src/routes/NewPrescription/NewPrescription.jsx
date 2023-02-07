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
import PatientData from "../../components/PatientData";

const NewPrescription = () => {
  const { patient } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();

  return (
    <>
      <h3>Patient Details</h3>
      {!patient ? <FindPatient /> : <PatientData patient={patient} />}

      <div className="prescriptionBlock">
        <h3>Prescriptions</h3>

        <PrescriptionForm />
      </div>
    </>
  );
};

export default NewPrescription;

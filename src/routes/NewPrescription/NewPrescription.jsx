import "./newPrescription.css";
import FindPatient from "../FindPatient/FindPatient";
import { useSelector } from "react-redux";
import PrescriptionForm from "../../components/PrescriptionForm";
import PatientData from "../../components/PatientData";

const NewPrescription = () => {
  const { patient } = useSelector((state) => state.prescription);

  return (
    <div className="fullPageContainer">
      <div className="prescriptionContainer">
        <h3>Patient Details</h3>
        {!patient ? <FindPatient /> : <PatientData patient={patient} />}
        <div>
          <h3>Prescriptions</h3>
          <PrescriptionForm />
        </div>
      </div>
    </div>
  );
};

export default NewPrescription;

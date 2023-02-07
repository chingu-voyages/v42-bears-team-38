import React, { useEffect, useState } from "react";
import MedicationData from "../../components/MedicationData";
import PatientData from "../../components/PatientData";
import PrescriberData from "../../components/PrescriberData";
import PrescriptionData from "../../components/PrescriptionData";
import { listPrescriptions } from "../../utils/perscriptionApi/perscriptionApi";
import "./findPrescription.css";

const FindPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  useEffect(() => {
    const getPrescriptions = async () => {
      const response = await listPrescriptions();
      if (response.length > 0) {
        setPrescriptions(response);
      }
    };
    getPrescriptions();
  }, []);
  console.log(prescriptions);
  return (
    <div>
      {prescriptions.length > 0 &&
        prescriptions.map((presciption, index) => {
          return (
            <div className="prescriptionDataContainer" key={index}>
              <PrescriptionData prescription={presciption} />
              <h3>Prescriber</h3>
              <PrescriberData prescriber={presciption.prescriber} />
              <h3>Patient</h3>
              <PatientData patient={presciption.patient} searchable={false} />
              <h3>Medication</h3>
              {presciption.medications.map((med, index) => (
                <MedicationData med={med} key={index} />
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default FindPrescription;

import { useEffect, useReducer } from "react";
import { MdMedicalServices } from "react-icons/md";
import { useSelector } from "react-redux";
import { Button } from "../stories/button/Button";
import Dropdown from "../stories/dropdown/Dropdown";
import { Input } from "../stories/input/Input";
import "./prescriptionForm.css";
import { ImCancelCircle } from "react-icons/im";

const initialMedication = {
  name: "",
  form: null,
  route: null,
  dose: null,
  duration: null,
  frequency: null,
  quantity: null,
  refills: false,
};
const initialPrescription = {
  patient_id: null,
  prescriber_id: null,
  medications: [initialMedication],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "add_medication":
      return {
        ...state,
        medications: [...state.medications, initialMedication],
      };
    case "set_patient":
      return { ...state, patient_id: action.payload };
    case "set_prescriber":
      return { ...state, prescriber_id: action.payload };
    case "set_medication":
      const newMedications = state.medications.map((med, index) =>
        index == action.payload.index
          ? {
              ...med,
              [action.payload.title]: action.payload[action.payload.title],
            }
          : med
      );
      return { ...state, medications: newMedications };
    case "remove_med":
      const medRemoved = state.medications.filter(
        (med) => med.name !== action.payload.name
      );
      return { ...state, medications: medRemoved };
    default:
      return state;
  }
};

const PrescriptionForm = () => {
  const [state, dispatch] = useReducer(reducer, initialPrescription);
  const { patient } = useSelector((state) => state.prescription);
  const {
    userInfo: { id },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (patient?.id) {
      dispatch({ type: "set_patient", payload: patient.id });
    }
  }, [patient]);
  useEffect(() => {
    dispatch({ type: "set_prescriber", payload: id });
  }, []);
  const handleSelectName = (name, index) => {
    dispatch({
      type: "set_medication",
      payload: { title: "name", name, index },
    });
  };
  const handleSelectDose = (dose, index) => {
    dispatch({
      type: "set_medication",
      payload: { title: "dose", dose, index },
    });
  };
  const handleSelectDuration = (duration, index) => {
    dispatch({
      type: "set_medication",
      payload: { title: "duration", duration, index },
    });
  };
  const handleSelectFrequency = (frequency, index) => {
    dispatch({
      type: "set_medication",
      payload: { title: "frequency", frequency, index },
    });
  };
  const handleSelectQuantity = (quantity, index) => {
    dispatch({
      type: "set_medication",
      payload: { title: "quantity", quantity, index },
    });
  };

  const handleSelectRefills = (refills, index) => {
    dispatch({
      type: "set_medication",
      payload: { title: "refills", refills, index },
    });
  };

  const handleCancelMed = (med) => {
    dispatch({
      type: "remove_med",
      payload: med,
    });
  };

  return (
    <div>
      {state.medications.map((med, index) => (
        <div className="medicationFields" key={index}>
          <Dropdown
            isSearchable
            value={med.name}
            onChange={(name) => handleSelectName(name, index)}
          />

          <Input
            name="dose"
            label="Dosage"
            onChange={(dose) => handleSelectDose(dose, index)}
          />
          <Input
            name="duration"
            label="Duration"
            onChange={(duration) => handleSelectDuration(duration, index)}
          />
          <Input
            name="frequency"
            label="Frequency"
            onChange={(frequency) => handleSelectFrequency(frequency, index)}
          />
          <Input
            name="quantity"
            label="Quantity"
            onChange={(quantity) => handleSelectQuantity(quantity, index)}
          />
          <Input
            name="refills"
            label="Refills"
            onChange={(refills) => handleSelectRefills(refills, index)}
          />
          <div className="cancelButton">
            <Button
              label={<ImCancelCircle />}
              onClick={() => handleCancelMed(med)}
            />
          </div>
        </div>
      ))}
      <Button
        icon={<MdMedicalServices />}
        label="Add Medication"
        onClick={() => {
          dispatch({ type: "add_medication" });
        }}
        type="button"
      />
      <div className="submitPrescription">
        <Button
          label="Submit Prescription"
          onClick={() => console.log(state)}
        />
      </div>
    </div>
  );
};

export default PrescriptionForm;

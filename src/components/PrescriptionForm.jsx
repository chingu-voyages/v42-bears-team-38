import { useEffect, useReducer } from "react";
import { MdMedicalServices } from "react-icons/md";
import { useSelector } from "react-redux";
import { Button } from "../stories/button/Button";
import Dropdown from "../stories/dropdown/Dropdown";
import { Input } from "../stories/input/Input";
import "./prescriptionForm.css";
import { ImCancelCircle } from "react-icons/im";
import SelectInput from "../stories/selectInput/SelectInput";
import { addPrescription } from "../utils/perscriptionApi/perscriptionApi";

const initialMedication = {
  name: "",
  form: null,
  route: null,
  dose: null,
  duration: null,
  frequency: null,
  quantity: null,
  refills: false,
  repeat_review_date: null,
};
const initialPrescription = {
  patient_id: null,
  user_id: null,
  medications: [initialMedication],
  status: null,
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
      return { ...state, user_id: action.payload };
    case "set_medication":
      const newMedications = state.medications.map((med, index) =>
        index == action.payload.index
          ? {
              ...med,
              [action.payload.title]: action.payload.value,
            }
          : med
      );
      return { ...state, medications: newMedications };
    case "remove_med":
      const medRemoved = state.medications.filter(
        (med) => med.name !== action.payload.name
      );
      return { ...state, medications: medRemoved };
    case "update_status":
      return { ...state, status: action.payload };
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

  const handleChangeFormData = (title, value, index) => {
    dispatch({
      type: "set_medication",
      payload: { title, value, index },
    });
  };

  const handleCancelMed = (med) => {
    dispatch({
      type: "remove_med",
      payload: med,
    });
  };

  const handleSubmit = async () => {
    const response = await addPrescription(state);
    if (response) {
      dispatch({
        type: "update_status",
        payload: response,
      });
    }
  };

  return (
    <div>
      {state.medications.map((med, index) => (
        <div className="medicationFields" key={index}>
          <Dropdown
            isSearchable
            value={med.name}
            onChange={(name) => handleChangeFormData("name", name, index)}
          />

          <Input
            name="dose"
            label="Dosage"
            onChange={(dose) => handleChangeFormData("dose", dose, index)}
          />
          <SelectInput
            label="Form"
            options={[
              "suspension",
              "tablet",
              "capsule",
              "solution",
              "tsp",
              "ml",
              "units",
              "inhalations",
              "gtts (drops)",
              "cream",
              "ointment",
              "puff",
            ]}
            onChange={(form) => handleChangeFormData("form", form, index)}
          />
          <Input
            name="duration"
            label="Duration"
            onChange={(duration) =>
              handleChangeFormData("duration", duration, index)
            }
          />

          <SelectInput
            label="Frequency"
            options={[
              "b.i.d.",
              "t.i.d.",
              "q.i.d.",
              "q.3h",
              "q.4h",
              "q.5h",
              "q.6h",
              "q.8h",
              "q.d.",
              "a.c.",
              "p.c.",
              "a.m.",
              "p.m.",
              "ante",
              "h",
              "h.s.",
              "p.r.n.",
              "stat",
              "Weekly",
              "Monthly",
            ]}
            onChange={(frequency) =>
              handleChangeFormData("frequency", frequency, index)
            }
          />

          <SelectInput
            label="Route"
            options={[
              "Per Oris",
              "By Mouth",
              "Per Rectum",
              "To Skin",
              "To Affected Area",
              "Sublingual",
              "OS",
              "IM",
              "IV",
              "Per Nostril",
              "Both Ears",
              "Left Ear",
              "Right Ear",
              "Inhale",
              "Intradermal",
              "Intramuscular",
              "Other/Miscellaneous",
              "Transdermal",
            ]}
            onChange={(route) => handleChangeFormData("route", route, index)}
          />
          <Input
            name="quantity"
            label="Quantity"
            onChange={(quantity) =>
              handleChangeFormData("quantity", quantity, index)
            }
          />
          <SelectInput
            label="Refills"
            options={[true, false]}
            onChange={(refills) =>
              handleChangeFormData("refills", refills, index)
            }
          />
          {state.medications[index].refills && (
            <Input
              label="Review date"
              type="date"
              onChange={(repeat_review_date) =>
                handleChangeFormData(
                  "repeat_review_date",
                  repeat_review_date,
                  index
                )
              }
            />
          )}

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
        <Button label="Submit Prescription" onClick={handleSubmit} />
      </div>
      {state.status && <p>{state.status}</p>}
    </div>
  );
};

export default PrescriptionForm;

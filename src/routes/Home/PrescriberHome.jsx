import { AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import "./prescriberHome.css";
import { Button } from "../../stories/button/Button";
import { useNavigate } from "react-router-dom";
import ButtonSpacer from "../../components/ButtonSpacer";

const PrescriberHome = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="screenContainer">
        <Button
          label="Add Patient"
          primary={false}
          icon={<AiOutlinePlusCircle />}
          onClick={() => navigate("addPatient")}
          width={190}
          backgroundColor="red"
        />
        <ButtonSpacer />

        <Button
          label="Find Patient"
          icon={<AiOutlineSearch />}
          onClick={() => navigate("findPatient")}
          width={190}
        />
        <ButtonSpacer />
        <Button
          label="New Prescription"
          primary={false}
          icon={<AiOutlinePlusCircle />}
          onClick={() => navigate("newPrescription")}
          width={190}
        />
        <ButtonSpacer />
        <Button
          label="Find Prescription"
          icon={<AiOutlineSearch />}
          onClick={() => navigate("findPrescription")}
          width={190}
        />
      </div>
    </section>
  );
};

export default PrescriberHome;

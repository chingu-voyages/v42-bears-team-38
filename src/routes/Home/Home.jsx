import { AiOutlinePlusCircle, AiOutlineSearch } from "react-icons/ai";
import "./home.css";
import { Button } from "../../stories/button/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section>
      <Button
        label="Add Patient"
        primary={false}
        icon={<AiOutlinePlusCircle />}
        onClick={() => navigate("addPatient")}
        width={190}
        backgroundColor="red"
      />
      <Button
        label="Find Patient"
        icon={<AiOutlineSearch />}
        onClick={() => navigate("findPatient")}
        width={190}
      />

      <Button
        label="New Prescription"
        primary={false}
        icon={<AiOutlinePlusCircle />}
        onClick={() => navigate("newPrescription")}
        width={190}
      />
      <Button
        label="Find Prescription"
        icon={<AiOutlineSearch />}
        onClick={() => navigate("findPrescription")}
        width={190}
      />
    </section>
  );
};

export default Home;

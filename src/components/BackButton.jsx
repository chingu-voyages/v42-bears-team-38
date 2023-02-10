import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Button } from "../stories/button/Button";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="backButton">
      <Button
        label={<IoArrowBackSharp size={15} />}
        onClick={() => navigate("/")}
      />
    </div>
  );
};

export default BackButton;

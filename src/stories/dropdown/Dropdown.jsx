import React, { useEffect, useRef, useState } from "react";
import { Input } from "../input/Input";
import { queryApi } from "../../utils/store/medActions";

import "./dropdown.css";
import { useDispatch, useSelector } from "react-redux";

const Dropdown = ({ placeHolder, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);

  const inputRef = useRef();
  const [textInput, setTextInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });
  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const onItemClick = (option) => {
    onChange(option);
    setTextInput(option);
  };

  const drugs = useSelector((state) => state.medications.medications.drugNames);

  useEffect(() => {
    if (textInput != "") {
      onChange(textInput);
      dispatch(queryApi(textInput));
    }
  }, [textInput]);

  return (
    <div>
      <div ref={inputRef} onClick={handleInputClick}>
        <Input
          onChange={setTextInput}
          value={textInput}
          label="Drug generic name"
        />
      </div>
      {showMenu && (
        <div className="dropdown-menu">
          {drugs?.map((option) => (
            <div
              onClick={() => onItemClick(option)}
              key={option.value}
              className={`dropdown-item`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

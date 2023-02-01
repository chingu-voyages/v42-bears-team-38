import React, { useEffect, useState } from "react";
import { Input } from "../../stories/input/Input";
import { FaEnvelope } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Button } from "../../stories/button/Button";
import "./signup.css";
import { registerUser } from "../../utils/store/Auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [prefix, setPrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const handleSignUp = async () => {
    if (
      password === confirmPassword &&
      email &&
      firstName &&
      lastName &&
      prefix
    ) {
      dispatch(registerUser({ prefix, firstName, lastName, email, password }));
    }
  };

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) navigate("/login");
    // redirect authenticated user to profile screen
    if (userInfo) navigate("/");
  }, [navigate, userInfo, success]);

  return (
    <section>
      <div className="input-wrapper">
        <Input
          icon={<FaEnvelope />}
          value={prefix}
          onChange={setPrefix}
          label="Title"
        />
        <Input
          icon={<FaEnvelope />}
          value={firstName}
          onChange={setFirstName}
          label="First Name"
        />
        <Input
          icon={<FaEnvelope />}
          value={lastName}
          onChange={setLastName}
          label="Last Name"
        />
        <Input
          icon={<FaEnvelope />}
          value={email}
          onChange={setEmail}
          label="E-mail"
        />
        <Input
          icon={<MdPassword />}
          type="password"
          value={password}
          onChange={setPassword}
          label="Password"
        />
        <Input
          icon={<MdPassword />}
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm password"
        />

        <div>
          <Button label="Signup" onClick={handleSignUp} />
        </div>

        {error && <p>{error}</p>}
      </div>
    </section>
  );
};

export default Signup;

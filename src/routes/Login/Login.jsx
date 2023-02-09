import React, { useEffect, useState } from "react";
import { Input } from "../../stories/input/Input";
import { FaEnvelope } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Button } from "../../stories/button/Button";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../utils/store/Auth/authActions";
import ButtonSpacer from "../../components/ButtonSpacer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    await dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <section>
      <div className="screenContainer">
        <Input
          icon={<FaEnvelope />}
          value={email}
          onChange={setEmail}
          label="E-mail"
          type="email"
        />
        <Input
          icon={<MdPassword />}
          type="password"
          value={password}
          onChange={setPassword}
          label="Password"
        />
        <ButtonSpacer />
        <Button label="Login" onClick={handleLogin} />

        {error && <p>Unable to login</p>}
      </div>
    </section>
  );
};

export default Login;

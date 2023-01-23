import React, { useEffect, useState } from "react";
import { Input } from "../../stories/input/Input";
import { FaEnvelope } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { Button } from "../../stories/button/Button";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../utils/store/Auth/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, userInfo } = useSelector((state) => state.auth);

  const handleLogin = async () => {
    dispatch(userLogin({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <section>
      <Input icon={<FaEnvelope />} value={email} onChange={setEmail} />
      <Input
        icon={<MdPassword />}
        type="password"
        value={password}
        onChange={setPassword}
      />
      <div>
        <Button label="Login" onClick={handleLogin} />
      </div>
      {error && <p>{error}</p>}
    </section>
  );
};

export default Login;

import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setHeader } from "../../utils/perscriptionApi/perscriptionApi";
import { useGetUserDetailsQuery } from "../../utils/service/authService";
import { setCredentials } from "../../utils/store/Auth/authSlice";

import { Button } from "../button/Button";
import "./header.css";

export const Header = ({ onLogin, onLogout }) => {
  const navigate = useNavigate();
  const { userInfo, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    // perform a refetch every 15mins
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  useEffect(() => {
    setHeader();
  }, [token]);

  return (
    <header>
      <div className="wrapper">
        <div>
          <h1 onClick={() => navigate("/")} className="logo">
            Prescription Manager
          </h1>
        </div>
        <div className="login">
          {userInfo ? (
            <>
              <span className="welcome">
                Welcome, <b>{userInfo.firstName}</b>!
              </span>
              <Button size="small" onClick={onLogout} label="Log out" />
            </>
          ) : (
            <>
              <Button size="small" onClick={onLogin} label="Log in" />
              <Button
                primary
                size="small"
                onClick={() => navigate("/signup")}
                label="Sign up"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

Header.defaultProps = {};

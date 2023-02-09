import { Outlet } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { Header } from "./header/Header";
import "./page.css";

import { useDispatch } from "react-redux";
import { logout } from "../utils/store/Auth/authSlice";

export const Page = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <Header onLogin={() => navigate("/login")} onLogout={handleLogout} />
      <div className="pageContainer">
        <Outlet />
      </div>
    </div>
  );
};

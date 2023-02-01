// ProtectedRoute.js
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./protected.css";

const ProtectedPrescriberRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // show unauthorized screen if no user is found in redux store
  if (!userInfo || userInfo.role != "prescriber") {
    return (
      <div className="unauthorized">
        <h1>
          Unauthorized:
          <NavLink to="/login">Login</NavLink> to gain access
        </h1>
      </div>
    );
  }

  // returns child route elements
  return <Outlet />;
};
export default ProtectedPrescriberRoute;

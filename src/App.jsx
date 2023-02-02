import "./App.css";
import { Page } from "./stories/Page";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./utils/store/store";

import Signup from "./routes/Signup/Signup";
import Login from "./routes/Login/Login";
import React from "react";
import AddPatient from "./routes/AddPatient/AddPatient";
import FindPatient from "./routes/FindPatient/FindPatient";
import NewPrescription from "./routes/NewPrescription/NewPrescription";
import FindPrescription from "./routes/FindPrescription/FindPrescription";
import ProtectedPrescriberRoute from "./routes/Protected/ProtectedPrescriber";
import PrescriberHome from "./routes/Home/PrescriberHome";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page />}>
              <Route element={<ProtectedPrescriberRoute />}>
                <Route index element={<PrescriberHome />} />
                <Route path="addPatient" element={<AddPatient />} />
                <Route path="findPatient" element={<FindPatient />} />
                <Route path="newPrescription" element={<NewPrescription />} />
                <Route path="findPrescription" element={<FindPrescription />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;

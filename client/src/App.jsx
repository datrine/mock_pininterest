import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";

import { Login } from "./components";
import Home from "./container/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};
export default App;

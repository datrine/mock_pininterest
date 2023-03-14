import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
const VITE_AUTHO_DOMAIN = import.meta.env.VITE_AUTHO_DOMAIN;
const VITE_AUTHO_CLIENTID = import.meta.env.VITE_AUTHO_CLIENTID;
const VITE_FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={VITE_AUTHO_DOMAIN}
      clientId={VITE_AUTHO_CLIENTID}
      authorizationParams={{ redirect_uri: `${VITE_FRONTEND_URL}` }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

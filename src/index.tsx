import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Navigation></Navigation>
        <App />      
      </BrowserRouter>
    </AuthProvider>
    <div id="loader-container" className="disp-none">
      <CircularProgress />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

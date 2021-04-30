import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css"
import App from "./App";
import Navigation from "./components/navigation/Navigation";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Navigation></Navigation>
      <App />
      <ToastContainer />
    </BrowserRouter>
    <div id="loader-container" className="disp-none">
      <CircularProgress />
    </div>
  </AuthProvider>,
  // </React.StrictMode>
  document.getElementById("root")
);

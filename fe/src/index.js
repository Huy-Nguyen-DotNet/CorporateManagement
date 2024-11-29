import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/all.min.css";
import "./assets/css/adminCss/app.min.css";
import "./assets/css/slick.css";
import "./assets/css/simple-line-icons.css";
import "./assets/css/style.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRoute
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
localStorage.removeItem("token");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {" "}
    {/* Bao quanh ứng dụng bằng BrowserRouter */}
    <App />
  </BrowserRouter>
);

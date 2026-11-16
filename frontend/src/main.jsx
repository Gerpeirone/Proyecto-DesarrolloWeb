import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@components/App";
import "@styles/main.scss";
import "../../css/notificaciones.css";
import "../../js/notificaciones.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

/**
 * main.jsx
 * =========
 * The entry point of the React application.
 * 
 * SETUP:
 * - Creates the React root
 * - Wraps app with BrowserRouter for routing
 * - Renders the App component
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

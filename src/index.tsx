import "./index.css";

import React from "react";
import reactDom from "react-dom/client";
import { App } from "./App";

const rootElement = document.querySelector("#root");

// New ReactJS 18 method of rendering application.
if (rootElement) {
  const root = reactDom.createRoot(rootElement);
  root.render(<App />);
}

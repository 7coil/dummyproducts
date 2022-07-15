import './index.css'

import React from "react";
import reactDom from "react-dom";
import { App } from "./App";

const rootElement = document.querySelector("#root");

reactDom.render(<App />, rootElement);

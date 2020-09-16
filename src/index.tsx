import React from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";

import { CssBaseline } from "@material-ui/core";

import { App } from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

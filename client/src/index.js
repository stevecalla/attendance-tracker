import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router-dom";
import { createHashHistory } from "history";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import App from "./App";

import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faXmarkCircle,
  faSearch,
  faCheck,
  faXmark,
  faCopy,
  faClipboard,
  faRotateRight,
  faSave,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faTrash,
  faXmarkCircle,
  faSearch,
  faCheck,
  faXmark,
  faCopy,
  faClipboard,
  faRotateRight,
  faSave,
  faCloud
);

const root = ReactDOM.createRoot(document.getElementById("root"));

const history = createHashHistory();

root.render(
  <React.StrictMode>
    {/* <Router history={history}> */}
      <App />
    {/* </Router> */}
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

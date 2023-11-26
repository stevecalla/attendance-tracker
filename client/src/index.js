import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; //v6
// import { Router } from "react-router-dom";
// import { createHashHistory } from "history";
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
  faEye,
  faEyeSlash,
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
  faCloud,
  faEye,
  faEyeSlash,
);

const root = ReactDOM.createRoot(document.getElementById("root"));

// const history = createHashHistory();

root.render(
  <React.StrictMode>
    {/* <Router history={history}> */}
    <Router>
      <App />
    {/* </Router> */}
    </Router>
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

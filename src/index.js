import React from "react";
import { render } from "react-dom";

// react router for different pages
import { BrowserRouter as Router } from "react-router-dom";

// boostrap css to be injected using babel
import "bootstrap/dist/css/bootstrap.min.css";

// main app component
import App from "./components/App.js";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

// if initializing redux store from local or server, pass initial state here
const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);

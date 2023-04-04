import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import Chatwidget from "./components/Chatwidget";
ReactDOM.render(
  <Provider store={store}>
    <App />
    <Chatwidget />
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();

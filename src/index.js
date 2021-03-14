import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

//Components
import Navbar from "./components/navbar";

//Pages
import Home from "./pages/home";

import "./index.css";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <div
      style={{ display: "grid", gridTemplateRows: "auto 1fr", height: "100vh" }}
    >
      <Navbar />
      <Home/>
    </div>
  </Provider>,
  document.getElementById("root")
);

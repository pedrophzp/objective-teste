import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";
import history from "./utils/history";

//Components
import Navbar from "./components/navbar";

//Pages
import Home from "./pages/home";
import Detail from "./pages/detail";

import "./index.css";

ReactDOM.render(
  <div style={{display:'grid',gridTemplateRows:'auto 1fr', height:'100vh'}}>
    <Navbar />
    <Router history={history}>
      <Switch>
        <Route path="*" component={Home} />
        <Route path="/detail/:id" component={Detail} />
      </Switch>
    </Router>
  </div>,
  document.getElementById("root")
);

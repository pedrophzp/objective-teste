import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router';
import history from './utils/history';

//Pages
import Home from './pages/home';
import Detail from './pages/detail';

import './index.css';

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="*" component={Home}/>
      <Route path="/detail/:id" component={Detail}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

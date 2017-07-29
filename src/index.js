import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';

import Budget from './pages/Budget';
import Code from './pages/Code';
import Homepage from './pages/Homepage';
import Login from './pages/Login';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css';

const router = (
<BrowserRouter>
  <div>
    <Route exact path='/' component={Homepage} />
    <Route path='/code' component={Code} />
    <Route path='/login' component={Login} />
    <Route path='/budget' component={Budget} />
  </div>
</BrowserRouter>);

ReactDOM.render(
  router,
  document.getElementById('root')
);

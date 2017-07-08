import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';

import About from './pages/About';
import Budget from './pages/Budget';
import Code from './pages/Code';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Writing from './pages/Writing';


import 'normalize.css/normalize.css';
import 'font-awesome/css/font-awesome.css';

import './style.css'

const router = (
<BrowserRouter>
  <div>
    <Route exact path='/' component={Homepage} />
    <Route path='/about' component={About} />
    <Route path='/code' component={Code} />
    <Route path='/login' component={Login} />
    <Route path='/writing' component={Writing} />
    <Route path='/budget' component={Budget} />
  </div>
</BrowserRouter>);

ReactDOM.render(
  router,
  document.getElementById('root')
);

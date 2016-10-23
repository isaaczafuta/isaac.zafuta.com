import React from 'react';
import { Router, Route } from 'react-router';

import About from './pages/About';
import Code from './pages/Code';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Writing from './pages/Writing';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Homepage} />
    <Route path='/about' component={About} />
    <Route path='/code' component={Code} />
    <Route path='/login' component={Login} />
    <Route path='/writing' component={Writing} />
  </Router>
);

export default Routes;

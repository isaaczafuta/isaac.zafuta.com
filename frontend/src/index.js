import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import {authenticationContext} from "./helpers/authenticationContext";

import Budget from './pages/Budget';
import Code from './pages/code';
import PyDHT from './pages/code/PyDHT';
import WritingArchOnAMacMini from './pages/writing/arch-on-mac-mini';
import WritingInstallingPacaur from './pages/writing/installing-pacaur';
import Homepage from './pages/Homepage';
import {SignIn} from './pages/sign-in';


import "./theme.css"
import 'font-awesome/css/font-awesome.css';


const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    authenticationContext.isAuthenticated() ? <Component {...props}/> : <Redirect to='/signin'/>)
  }/>
);

const router = (
  <BrowserRouter>
    <React.Fragment>
      <Route exact path='/' component={Homepage} />
      <Route exact path='/code' component={Code} />
      <Route exact path='/code/pydht' component={PyDHT} />
      <Route exact path='/writing/arch-on-a-mac-mini' component={WritingArchOnAMacMini} />
      <Route exact path='/writing/installing-pacaur' component={WritingInstallingPacaur} />
      <Route exact path='/signin' component={SignIn} />
      <AuthenticatedRoute exact path='/budget' component={Budget} />
    </React.Fragment>
  </BrowserRouter>
);

ReactDOM.render(
  router,
  document.getElementById('root')
);

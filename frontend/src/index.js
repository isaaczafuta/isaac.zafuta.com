import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route} from 'react-router-dom';

import Budget from './pages/Budget';
import Code from './pages/code';
import PyDHT from './pages/code/PyDHT';
import WritingArchOnAMacMini from './pages/writing/arch-on-mac-mini';
import WritingInstallingPacaur from './pages/writing/installing-pacaur';
import Homepage from './pages/Homepage';
import Login from './pages/Login';


import "./theme.css"
import 'font-awesome/css/font-awesome.css';

const router = (
<BrowserRouter>
  <div>
    <Route exact path='/' component={Homepage} />
    <Route exact path='/code' component={Code} />
    <Route exact path='/code/pydht' component={PyDHT} />
    <Route exact path='/writing/arch-on-a-mac-mini' component={WritingArchOnAMacMini} />
    <Route exact path='/writing/installing-pacaur' component={WritingInstallingPacaur} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/budget' component={Budget} />
  </div>
</BrowserRouter>);

ReactDOM.render(
  router,
  document.getElementById('root')
);

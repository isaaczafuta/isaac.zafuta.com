import React, { Component } from 'react';

import Navigation from '../../components/layout/Navigation';
import Page from '../../components/layout/Page';

import './style.css';

class Login extends Component {
  render() {
    return (
      <Page>
        <Navigation/>
        <h1>Login</h1>
      </Page>
    );
  }
}

export default Login;

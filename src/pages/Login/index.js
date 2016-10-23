import React, { Component } from 'react';

import Body from '../../components/layout/Body';
import Navigation from '../../components/layout/Navigation';
import Page from '../../components/layout/Page';

import './style.css';

class Login extends Component {
  render() {
    return (
      <Page>
        <Navigation/>
        <Body>
          <h1>Login</h1>
        </Body>
      </Page>
    );
  }
}

export default Login;

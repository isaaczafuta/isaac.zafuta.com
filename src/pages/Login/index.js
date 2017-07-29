import React, { Component } from 'react';

import Navigation from '../../components/layout/Navigation';
import Page from '../../components/layout/Page';

class Login extends Component {
  render() {
    return (
      <Page>
        <Navigation/>
        <div className="container">
          <h1 className="title has-text-centered">
            Login
            <div className="columns">
              <div className="column is-one-third is-offset-one-third">
                asd
              </div>
            </div>
          </h1>
        </div>
      </Page>
    );
  }
}

export default Login;

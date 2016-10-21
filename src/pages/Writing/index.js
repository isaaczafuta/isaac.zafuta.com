import React, { Component } from 'react';

import Body from "../../components/layout/Body";
import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

import './style.css';

class Writing extends Component {
  render() {
    return (
      <Page>
        <Navigation/>
        <Body>
          <div className="Writing">
          </div>
        </Body>
      </Page>
    );
  }
}

export default Writing;

import React, { Component } from 'react';

import Body from "../../components/Body";
import Navigation from "../../components/Navigation";
import Page from "../../components/Page";

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

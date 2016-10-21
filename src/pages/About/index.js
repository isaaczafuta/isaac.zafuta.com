import React, { Component } from 'react';

import Body from "../../components/layout/Body";
import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

import './style.css';

class About extends Component {
  render() {
    return (
      <Page>
        <Navigation/>
        <Body>
          <div className="About">
          </div>
        </Body>
      </Page>
    );
  }
}

export default About;

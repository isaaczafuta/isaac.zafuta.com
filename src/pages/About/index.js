import React, { Component } from 'react';

import Body from "../../components/Body";
import Navigation from "../../components/Navigation";
import Page from "../../components/Page";

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

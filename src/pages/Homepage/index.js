import React, { Component } from 'react';

import Body from "../../components/layout/Body";
import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

import './style.css';

class Homepage extends Component {
  render() {
    return (
      <Page>
        <Navigation/>
        <Body>
          <div className="Homepage">
            <pre>{`Meticulous, yes. Methodical. Educated. They were these things.

Nothing extreme. Like anyone, they varied. There were days of mistakes and laziness and infighting.
And there were days, good days, when by anyone's judgment, they would have to be considered clever.

They took from their surroundings what was needed, and made of it something more.`}</pre>
          </div>
        </Body>
      </Page>
    );
  }
}

export default Homepage;

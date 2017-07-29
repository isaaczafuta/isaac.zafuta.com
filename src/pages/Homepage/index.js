import React, { Component } from 'react';

import Navigation from "../../components/layout/Navigation";
import Page from "../../components/layout/Page";

import './style.css';

class Homepage extends Component {

  render() {
    return (
      <Page>
        <Navigation/>
        {/*<section className="hero is-primary">*/}
          {/*<div className="hero-body">*/}
            {/*<div className="container">*/}
              {/*<p className="title">Tux is the best cat</p>*/}
              {/*<p className="subtitle">*/}
                {/*I tell you, he is the <strong>best</strong> cat*/}
              {/*</p>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</section>*/}
      </Page>
    );
  }

}

export default Homepage;

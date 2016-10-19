import React, { Component } from 'react';

import "./style.css";

class Body extends Component {
  render() {
    return (
      <section className="Body">
        <div className="width-container">
          {this.props.children}
        </div>
      </section>
    );
  }
}

export default Body;

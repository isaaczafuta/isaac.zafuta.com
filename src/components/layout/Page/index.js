import React, { Component } from 'react';

import "./style.css";

class Page extends Component {
  render() {
    return (
      <div className="Page">{this.props.children}</div>
    );
  }
}

export default Page;

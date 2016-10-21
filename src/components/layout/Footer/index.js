import React, { Component } from 'react';
import { Link } from 'react-router';

import "./style.css";

class Footer extends Component {
  render() {
    return (
      <section className="Footer">
        {this.props.children}
      </section>
    );
  }
}

export default Footer;

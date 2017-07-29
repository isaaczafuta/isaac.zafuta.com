import React, { Component } from 'react';

class Page extends Component {
  render() {
    return (
      <div>{this.props.children}</div>  // TODO: Get rid of this with React 16
    );
  }
}

export default Page;

import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Page extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.updateTitle(props.title);
  }

  componentWillUpdate(nextProps) {
    this.updateTitle(nextProps.title);
  }

  updateTitle(title) {
    const potentialTitle = `${title} · Isaac Zafuta`;
    if (document.title !== potentialTitle) {
      document.title = potentialTitle;
    }
  }

  render() {
    return (
      <div>{this.props.children}</div>  // TODO: Get rid of this extra div with React 16
    );
  }
}

export default Page;

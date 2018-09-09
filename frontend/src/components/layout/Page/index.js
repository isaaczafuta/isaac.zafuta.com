import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';

class Page extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.updateTitle(props.title);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      this.updateTitle(this.props.title);
    }
  }

  updateTitle(title) {
    const potentialTitle = `${title} · Isaac Zafuta`;
    if (document.title !== potentialTitle) {
      document.title = potentialTitle;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Page;

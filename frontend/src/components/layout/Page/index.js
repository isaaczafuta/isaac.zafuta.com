import PropTypes from 'prop-types';
import React from 'react';


class Page extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    loading: false,
  };

  componentDidMount = () => {
    this._updateTitle(this.props.title);
  };

  componentDidUpdate = prevProps => {
    if (prevProps.title !== this.props.title) {
      this._updateTitle(this.props.title);
    }
  };

  _updateTitle = (title) => {
    const potentialTitle = `${title} · Isaac Zafuta`;
    if (document.title !== potentialTitle) {
      document.title = potentialTitle;
    }
  };

  render = () => {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}


export {
  Page,
}

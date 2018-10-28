import PropTypes from 'prop-types';
import React from 'react';


class Page extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,  // TODO: Make this required
  };

  static defaultProps = {
    description: '',
  };

  componentDidMount = () => {
    this._updateTitle(this.props.title);
    this._updateDescription(this.props.description);
  };

  componentDidUpdate = prevProps => {
    if (prevProps.title !== this.props.title) {
      this._updateTitle(this.props.title);
    }
    if (prevProps.description !== this.props.description) {
      this._updateDescription(this.props.description);
    }
  };

  _updateTitle = (title) => {
    const formattedTitle = title ? `${title} · Isaac Zafuta` : "Isaac Zafuta";
    document.title = formattedTitle;
  };

  _updateDescription = (description) => {
    document.querySelector('meta[name="description"]').setAttribute("content", description);
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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class ProjectOverview extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
  };
  render() {
    return (
      <div className="ProjectOverview">
        <hr/>
        <div className="container">
          <img alt="" src={this.props.image} className="project-image"/>
          <div className="project-info">
            <p className="title">
              <Link to={this.props.link}>{this.props.title}</Link></p>
            <p className="description">{this.props.description}</p>
            <p>
              <a href={this.props.link}>More Info</a> <a href={this.props.github}>GitHub</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export {
  ProjectOverview,
};

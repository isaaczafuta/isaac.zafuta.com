import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

class Navigation extends Component {
  render() {
    return (
      <nav className='Navigation'>
        <div className='width-container'>
          <div className='brand'>
            <Link to='/'>Isaac Zafuta</Link>
          </div>
          <ul>
            <li>
              <Link to='/code'>Code</Link>
            </li>
            <li>
              <Link to='/writing'>Writing</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li className='right'>
              <Link to='/login'>Sign In</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;

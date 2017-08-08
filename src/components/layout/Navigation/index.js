import classNames from 'classnames';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navbarBurgerOpen: false,
    }
  };

  showMenu = (element) => {
    this.setState({navbarBurgerOpen: !this.state.navbarBurgerOpen});
  };

  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Isaac Zafuta
            </Link>
            <div className={classNames('navbar-burger', 'burger', {'is-active': this.state.navbarBurgerOpen})}
                 onClick={this.showMenu} >
              <span/>
              <span/>
              <span/>
            </div>
          </div>

          <div className={classNames('navbar-menu', {'is-active': this.state.navbarBurgerOpen})}>
            <div className="navbar-start">
              <Link to="/" className="navbar-item">Home</Link>
              <Link to="/code" className="navbar-item">Code</Link>
              <div className="navbar-item has-dropdown is-hoverable">
                <Link to="/writing" className="navbar-link">
                  Writing
                </Link>
                <div className="navbar-dropdown is-boxed">
                  <Link to="/writing/arch-on-a-mac-mini" className="navbar-item">
                    <div className="navbar-content">
                      <p>
                        <small className="has-text-info">7 Aug 2017</small>
                      </p>
                      <p>Installing Arch on a Mac Mini</p>
                    </div>
                  </Link>
                  <hr className="navbar-divider"/>
                  <Link to="/writing" className="navbar-item">
                    More posts
                  </Link>
                </div>
              </div>
            </div>

            <div className="navbar-end">
              <a href="https://github.com/isaaczafuta" className="navbar-item">
                Github
              </a>
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <Link to='/login' className="button is-primary">
                      <span className="icon">
                        <i className="fa fa-sign-in"/>
                      </span>
                      <span>Sign In</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;

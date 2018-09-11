import classNames from 'classnames';
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {CurrentUserContext} from '../../../helpers/CurrentUserContext';
import {signOut} from "../../../rest/auth";


const Navigation = withRouter(class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      navbarBurgerOpen: false,
    }
  };

  showMenu = () => {
    this.setState((prevState) => ({navbarBurgerOpen: !prevState.navbarBurgerOpen}));
  };

  _handleSignOut = async (setUser, e) => {
    e.preventDefault();
    try {
      await signOut();
      setUser(null);
      this.props.history.push('/');
    } catch (error) {
      // Just don't sign out.
    }
  };

  render = () => (
    <CurrentUserContext.Consumer>
      {({user, setUser}) => (
        <div className="container">
          <nav className="navbar">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Isaac Zafuta
              </Link>
              <div className={classNames('navbar-burger', 'burger', {'is-active': this.state.navbarBurgerOpen})}
                   onClick={this.showMenu}>
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
                    <Link to="/writing/installing-pacaur" className="navbar-item">
                      <div className="navbar-content">
                        <p>
                          <small className="has-text-info">17 Aug 2017</small>
                        </p>
                        <p>Installing Pacaur</p>
                      </div>
                    </Link>
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
                <div className="navbar-item has-dropdown is-hoverable">
                  <Link to="/apps" className="navbar-link">
                    Apps
                  </Link>
                  <div className="navbar-dropdown is-boxed">
                    <div className="navbar-content">
                      <Link to="/apps/budget" className="navbar-item">Budget</Link>
                      <Link to="/apps/music" className="navbar-item">Music</Link>
                      <Link to="/apps/tv" className="navbar-item">TV</Link>
                    </div>
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
                      {user === null ?
                        <Link to='/signin' className="button is-primary">
                          <span className="icon">
                            <i className="fa fa-sign-in"/>
                          </span>
                          <span>Sign In</span>
                        </Link> :
                        <button className="button is-primary" onClick={e => this._handleSignOut(setUser, e)}>
                          <span className="icon">
                            <i className="fa fa-sign-out"/>
                          </span>
                          <span>Sign Out</span>
                        </button>
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </CurrentUserContext.Consumer>
  );
});

export {
  Navigation,
};

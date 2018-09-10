import React from 'react';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames'

import {Navigation} from '../../components/layout/Navigation';
import {Page} from '../../components/layout/Page';

import {signIn} from "../../rest/auth";
import {CurrentUserContext} from "../../helpers/CurrentUserContext";


const SignInPage = () => (
  <Page title="Sign In">
    <Navigation/>
    <h1 className="title has-text-centered">Sign In</h1>
    <CurrentUserContext.Consumer>
      {({setUser}) => (
        <SignInBox setUser={setUser}/>
      )}
    </CurrentUserContext.Consumer>
  </Page>
);


const SignInBox = withRouter(class SignInBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',

      submitting: false,
      error: null,
    };
  }

  _handleUsernameInput = e => {
    this.setState({
      username: e.target.value,
    });
  };

  _handlePasswordInput = e => {
    this.setState({
      password: e.target.value,
    });
  };

  _handleSubmit = async e => {
    e.target.blur();
    this.setState({
      submitting: true,
      error: null,
    });
    try {
      const response = await signIn(this.state.username, this.state.password);
      this.props.setUser(response.data);
      this.props.history.push('/');
    } catch (response) {
      this.setState({
        submitting: false,
        error: "Unknown Credentials",
      });
    }
  };

  render = () => (
    <div className="container is-widescreen">
      {console.log({props: this.props, state: this.state})}
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <div className="notification">
            <Input label="Username"
                   value={this.state.username}
                   onChange={this._handleUsernameInput}
                   icon="user"
                   busy={this.state.submitting}/>
            <Input label="Password"
                   value={this.state.password}
                   onChange={this._handlePasswordInput}
                   type="password"
                   icon="lock"
                   busy={this.state.submitting}
                   error={this.state.error}/>
            <div className="field">
              <div className="control">
                <button disabled={this.state.username.length === 0 || this.state.password.length === 0}
                        onClick={this._handleSubmit}
                        className={classNames({
                          'button': true,
                          'is-fullwidth': true,
                          'is-info': true,
                          'is-loading': this.state.submitting,
                        })}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

});


const Input = ({label, value, onChange, type="text", icon=null, busy=false, error=null}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className={classNames({
      'control': true,
      'is-loading': busy,
      'has-icons-left': icon !== null,
      'has-icons-right': error !== null,
    })}>
      <input className={classNames({
        'input': true,
        'is-danger': error !== null,
      })} type={type} value={value} onChange={busy ? null : onChange}/>
      {icon && <span className="icon is-small is-left"><Icon name={icon}/></span>}
      {error && <span className="icon is-small is-right"><Icon name="exclamation-triangle"/></span>}
    </div>
    {error && <p className="help is-danger">{error}</p>}
  </div>
);


const Icon = ({name}) => (
  <i className={`fa fa-${name}`}/>
);

export {
  SignInPage,
}

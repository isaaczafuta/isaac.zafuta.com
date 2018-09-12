import React from 'react';
import {withRouter} from 'react-router-dom';
import classNames from 'classnames'

import {Navigation} from '../../components/layout/Navigation';
import {Page} from '../../components/layout/Page';

import {signIn} from "../../rest/auth";
import {CurrentUserContext} from "../../helpers/CurrentUserContext";
import {Icon} from "../../components/Icon";


const SignInPage = () => (
  <Page title="Sign In">
    <Navigation/>
    <div className="section container is-widescreen">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <CurrentUserContext.Consumer>
            {({setUser}) => (
              <SignInForm setUser={setUser}/>
            )}
          </CurrentUserContext.Consumer>
        </div>
      </div>
    </div>
  </Page>
);


const SignInForm = withRouter(class SignInForm extends React.Component {

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

  _handleSubmit = e => {
    e.preventDefault();
    this._submit(this.state.username, this.state.password);
  };

  _handleSignIn = e => {
    e.target.blur();
    this._submit(this.state.username, this.state.password);
  };

  _submit = async (username, password) => {
    this.setState({
      submitting: true,
      error: null,
    });
    try {
      const response = await signIn(username, password);
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
    <form className="notification" onSubmit={this._handleSubmit}>
      <div className="is-size-3 has-text-centered">Sign In</div>
      <Input label="Username"
             value={this.state.username}
             onChange={this._handleUsernameInput}
             icon="user"
             busy={this.state.submitting}
             hasError={this.state.error !== null}/>
      <Input label="Password"
             value={this.state.password}
             onChange={this._handlePasswordInput}
             type="password"
             icon="lock"
             busy={this.state.submitting}
             errorMessage={this.state.error}/>
      <div className="field">
        <div className="control">
          <button disabled={this.state.username.length === 0 || this.state.password.length === 0}
                  onClick={this._handleSignIn}
                  className={classNames({
                    'button': true,
                    'is-fullwidth': true,
                    'is-info': true,
                    'is-loading': this.state.submitting,
                  })}>
            Sign In
          </button>
        </div>
      </div>
    </form>
  );

});


const Input = ({label, value, onChange, type="text", icon=null, busy=false, errorMessage=null, hasError=(!!errorMessage)}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className={classNames({
      'control': true,
      'is-loading': busy,
      'has-icons-left': icon !== null,
      'has-icons-right': hasError,
    })}>
      <input className={classNames({
        'input': true,
        'is-danger': hasError,
      })} type={type} value={value} onChange={busy ? null : onChange}/>
      {icon && <span className="icon is-small is-left"><Icon name={icon}/></span>}
      {hasError && <span className="icon is-small is-right"><Icon name="exclamation-triangle"/></span>}
    </div>
    {errorMessage && <p className="help is-danger">{errorMessage}</p>}
  </div>
);

export {
  SignInPage,
}

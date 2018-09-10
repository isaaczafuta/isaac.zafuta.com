import classNames from "classnames";
import React from "react";
import {Route, Switch} from "react-router-dom";

import {HomePage} from "./pages/HomePage";
import {SignInPage} from "./pages/SignInPage";

import {CurrentUserContext} from "./helpers/CurrentUserContext";
import {BudgetPage} from "./pages/BudgetPage";

import {getUser} from "./rest/auth";

const PageLoader = ({active}) => (
  <div className={classNames({
    "pageloader": true,
    "is-active": active,
  })}>
    <span className="title">Loading</span>
  </div>
);


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      checkingAuthentication: true,
      user: null,
      setUser: this.setUser
    }
  }

  componentDidMount = () => {
    getUser()
      .then(response => this.setState({
        checkingAuthentication: false,
        user: response.data
      }))
      .catch(() => {
        this.setState({
          checkingAuthentication: false,
          user: null,
        });
      });
  };

  setUser = (user) => {
    this.setState({user});
  };

  render = () => (
    <React.Fragment>
      <PageLoader active={this.state.checkingAuthentication}/>
      {!this.state.checkingAuthentication && <CurrentUserContext.Provider value={this.state}>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/signin" component={SignInPage}/>
          <Route exact path="/budget" component={BudgetPage}/>
          {/*<Route path='/writing' component={WritingPage}/>*/}
          {/*<Route path='/code' component={CodePage}/>*/}
        </Switch>
      </CurrentUserContext.Provider>
      }
    </React.Fragment>
  )

}

export {
  App,
}

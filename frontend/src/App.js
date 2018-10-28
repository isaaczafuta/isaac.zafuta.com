import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import {HomePage} from "./pages/HomePage";
import {SignInPage} from "./pages/SignInPage";

import {CurrentUserContext} from "./helpers/CurrentUserContext";
import {BudgetPage} from "./pages/BudgetPage";
import {MusicPage} from "./pages/MusicPage";

import {getUser} from "./rest/auth";
import {PageLoader} from "./components/layout/PageLoader";


const TVPage = () => <div>Coming Soon</div>;


const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <CurrentUserContext.Consumer>
    {({user}) => (
      <Route {...rest} render={props => (
        user ? <Component {...props}/> : <Redirect to="/signin"/>
      )}/>
    )}
  </CurrentUserContext.Consumer>
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
    this._componentDidMount();
  };

  _componentDidMount = async () => {
    try {
      const response = await getUser();
      this.setState({
        checkingAuthentication: false,
        user: response.data,
      });
    } catch (e) {
      this.setState({
        checkingAuthentication: false,
        user: null,
      });
    }
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
          <Route exact path="/apps" component={() => <div>hi</div>} />
          <AuthenticatedRoute exact path="/apps/budget" component={BudgetPage}/>
          <AuthenticatedRoute exact path="/apps/music" component={MusicPage}/>
          <AuthenticatedRoute exact path="/apps/tv" component={TVPage}/>
        </Switch>
      </CurrentUserContext.Provider>
      }
    </React.Fragment>
  )

}

export {
  App,
}

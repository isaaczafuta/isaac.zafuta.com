const authenticationContext = new class AuthenticationContext {

  constructor() {
    this._authenticatedUser = null;
  }

  isAuthenticated = () => {
    return this.getAuthenticatedUser() !== null;
  };

  getAuthenticatedUser = () => {
    return this._authenticatedUser;
  };

  signIn = async (username, password) => {
    this._authenticatedUser = {username};
    return [];
  };

  signOut = async () => {
    return true;
  }

}();


export {
  authenticationContext,
}

import React from 'react';

const CurrentUserContext = React.createContext({
  user: null,
  setUser: () => {},
});


export {
  CurrentUserContext,
}

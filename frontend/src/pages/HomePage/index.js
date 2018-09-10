import React from 'react';

import {Navigation} from "../../components/layout/Navigation";
import {Page} from "../../components/layout/Page";


class HomePage extends React.Component {

  render() {
    return (
      <Page title="Home">
        <Navigation/>
      </Page>
    );
  }

}

export {
  HomePage,
}

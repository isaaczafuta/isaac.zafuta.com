import React from 'react';
import {Link} from 'react-router-dom';

import {Navigation} from '../../components/layout/Navigation';
import {Page} from '../../components/layout/Page';

const AppsPage = () => (
  <Page title="Apps" description="Apps for personal use.">
    <div className="code-page">
      <Navigation/>
      <div className="section container">
        <h1 className="title">Apps</h1>
        <h3 className="subtitle">Some web apps I've made.</h3>
        <hr/>
        <App name="Budget"
             description="Don't spend all your money."
             link="/apps/budget"/>
        <App name="Music"
             description="Turn up the volume."
             link="/apps/music"/>
        <App name="TV"
             description="Stay back from the screen."
             link="/apps/tv"/>
      </div>
    </div>
  </Page>
);


const App = ({name, description, link,}) => (
  <header className="media">
    <div className="media-content">
      <p className="is-size-5">{name}</p>
      <p>{description}</p>
    </div>
    <figure className="media-right">
      <Link className="button is-primary" to={link}>Go</Link>
    </figure>
  </header>
);


export {
  AppsPage,
}

import React from "react";
import {Link} from 'react-router-dom';

import {Page} from "../../components/layout/Page";
import {Navigation} from "../../components/layout/Navigation";


import logo from "../../images/logo/logo.svg"


const NotFoundPage = () => (
  <Page title="Not Found">
    <div className="not-found-page">
      <Navigation/>
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  {/*<h1 className="title">Oh no!</h1>*/}
                  <h2 className="title">Looks like I can't find that page.</h2>
                  <Link to="/" className="button is-link">Return Home</Link>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                  </div>
                </nav>
              </div>
              <figure className="media-right">
                <p className="image is-128x128">
                  <img className="image is-128x128" src={logo}/>
                </p>
              </figure>
            </article>
          </div>
        </div>
      </section>
    </div>
  </Page>
);


export {
  NotFoundPage,
}

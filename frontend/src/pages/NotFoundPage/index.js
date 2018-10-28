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
                <h1 className="title">You're lost!</h1>
                <h3 className="subtitle">Looks like I can't find that page.</h3>
                <div className="content">
                  <Link to="/" className="button is-link">Return Home</Link>
                </div>
              </div>
              <figure className="media-right">
                <p className="image is-128x128">
                  <img alt="" className="image is-128x128" src={logo}/>
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

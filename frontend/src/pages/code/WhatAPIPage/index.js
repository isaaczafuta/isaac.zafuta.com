import React from 'react';
import {Link} from 'react-router-dom';

import {Page} from "../../../components/layout/Page";
import {Navigation} from "../../../components/layout/Navigation";

import whatapi from "./whatapi.svg";


const WhatAPIPage = () => (
  <Page title="Code">
    <div className="whatapi-page">
      <Navigation/>
      <section className="section container">
        <header className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img alt="" src={whatapi}/>
            </p>
          </figure>
          <div className="media-content">
            <h1 className="title">whatapi</h1>
            <h3 className="subtitle">A simple python wrapper around the What.cd API.</h3>
          </div>
          <figure className="media-right">
            <a className="button" href="https://github.com/isaaczafuta/whatapi" target="_blank" rel="noopener noreferrer">
              <span className="icon">
                <i className="fa fa-github"/>
              </span>
              <span>View on GitHub</span>
            </a>
          </figure>
        </header>
        <hr/>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li><Link to="/code">Code</Link></li>
            <li className="is-active"><Link to="/code/whatapi">whatapi</Link></li>
          </ul>
        </nav>
        <section className="content">
          <p><strong>whatapi</strong> is a simple python wrapper around the What.cd API.</p>
          <p>It's also compatible with other what-like trackers like redacted and apollo.</p>
          <hr/>
          <p><strong>Example usage:</strong></p>
          <blockquote>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>import whatapi</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>redacted = whatapi.WhatAPI(username='me', password='secret', server='https://redacted.ch)</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>redacted.request("browse", searchstr="Talulah Gosh")</code>
            <br/>
            <code><span className="is-unselectable">...</span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>redacted.get_torrent(1234567)</code>
            <br/>
            <code><span className="is-unselectable">...</span></code>
          </blockquote>
          <hr/>
          <p>See the <a href="https://github.com/WhatCD/Gazelle/wiki/JSON-API-Documentation" target="_blank" rel="noopener noreferrer">Gazelle API Documentation</a> for more details.</p>
        </section>
      </section>
    </div>
  </Page>
);


export {
  WhatAPIPage,
}

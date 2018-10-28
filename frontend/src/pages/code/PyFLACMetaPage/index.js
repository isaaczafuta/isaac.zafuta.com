import React from 'react';
import {Link} from 'react-router-dom';

import {Page} from "../../../components/layout/Page";
import {Navigation} from "../../../components/layout/Navigation";

import pyflacmeta from "./pyflacmeta.svg";


const PyFLACMetaPage = () => (
  <Page title="Code">
    <div className="code-page">
      <Navigation/>
      <section className="section container">
        <header className="media">
          <figure className="media-left">
            <p className="image is-64x64">
              <img alt="" src={pyflacmeta}/>
            </p>
          </figure>
          <div className="media-content">
            <h1 className="title">pyflacmeta</h1>
            <h3 className="subtitle">A Pure Python3 FLAC Metadata Reader.</h3>
          </div>
          <figure className="media-right">
            <a className="button" href="https://github.com/isaaczafuta/pyflacmeta" target="_blank" rel="noopener noreferrer">
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
            <li className="is-active"><Link to="/code/pyflacmeta">pyflacmeta</Link></li>
          </ul>
        </nav>
        <section className="content">
          <p><strong>pyflacmeta</strong> reads tags (vorbis comments) from FLAC files.</p>
          <p>As there are no external dependencies, it should be lightweight and easy to install.</p>
          <hr/>
          <p><strong>Example usage:</strong></p>
          <blockquote>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>import pyflacmeta</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>flacfile = pyflacmeta.FLAC("test.flac")</code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>flacfile.keys()</code>
            <br/>
            <code><span className="is-unselectable">dict_keys(['album', 'artist', 'title', ...])</span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>flacfile['artist']</code>
            <br/>
            <code><span className="is-unselectable">'David Bowie'</span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>flacfile['title']</code>
            <br/>
            <code><span className="is-unselectable">'Life on Mars?'</span></code>
            <br/>
            <code className="has-text-dark"><span className="is-unselectable">>>> </span>flacfile.tags()</code>
            <br/>
            <code><span className="is-unselectable">{`{'album': 'Hunky Dory', 'artist': 'David Bowie', 'title': 'Life on Mars?', ...}`}</span></code>
          </blockquote>
        </section>
      </section>
    </div>
  </Page>
);


export {
  PyFLACMetaPage,
}

import React from 'react';
import {Link} from 'react-router-dom';

import {Navigation} from '../../components/layout/Navigation';
import {Page} from '../../components/layout/Page';

import pydht from '../code/PyDHTPage/pydht.svg';
import pyflacmeta from '../code/PyFLACMetaPage/pyflacmeta.svg';
import whatapi from '../code/WhatAPIPage/whatapi.svg';


import "./index.css"


const CodePage = () => (
  <Page title="Code">
    <div className="code-page">
      <Navigation/>
      <div className="section container">
        <Project icon={pydht}
                 name="pydht"
                 description="Python implementation of the Kademlia DHT data store."
                 link="code/pydht"
                 github="https://github.com/isaaczafuta/pydht"/>
        <Project icon={whatapi}
                 name="whatapi"
                 description="A simple wrapper around the What.cd API. Also compatible with what-like trackers such as redacted and apollo."
                 link="code/whatapi"
                 github="https://github.com/isaaczafuta/whatapi"/>
        <Project icon={pyflacmeta}
                 name="pyflacmeta"
                 description="A Pure Python3 FLAC Metadata Reader. Reads tags (vorbis comments) from FLAC files."
                 link="code/pyflacmeta"
                 github="https://github.com/isaaczafuta/pyflacmeta"/>
      </div>
    </div>
  </Page>
);


const Project = ({name, description, icon, link, github}) => (
  <div className="media">
    <figure className="media-left">
      <p className="image is-64x64">
        <img alt="" src={icon}/>
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{name}</strong>
          <br/>
          {description}
        </p>
      </div>
      <div className="buttons">
        <a className="button" href={github}>
          <span className="icon">
            <i className="fa fa-github"/>
          </span>
          <span>GitHub</span>
        </a>
        <Link to={link} className="button is-info" >More Info</Link>
      </div>
    </div>
  </div>
);


export {
  CodePage,
}

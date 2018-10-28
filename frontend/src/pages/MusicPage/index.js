import React from 'react';

import {Navigation} from '../../components/layout/Navigation';
import {Page} from '../../components/layout/Page';

import {Icon} from "../../components/Icon";


import "./index.sass"


const NowPlaying = () => (
  <div className="controls">
    <div className="container">
      <div className="playback-controls">
        <div className="icon"><Icon name="arrow-left"/></div>
        <div className="icon"><Icon name="pause"/></div>
        <div className="icon"><Icon name="arrow-right"/></div>
        <div className="icon"><Icon name="retweet"/></div>
      </div>
      <div className="track-progress">
        <div className="current-time has-text-danger is-size-7">0:14</div>
        <progress className="progress is-danger is-small" value="14" max="146"/>
        <div className="total-time is-size-7">2:26</div>
      </div>
      <div className="track-info">
        <div className="art-link">
          <img className="art" alt="" src="https://i1.sndcdn.com/artworks-000107159263-lbbkwl-t50x50.jpg"/>
        </div>
        <div className="track-artist-and-title">
          <div className="track-artist is-size-7">Seikatsu</div>
          <div className="track-title is-size-7">walk on girl</div>
        </div>
      </div>
      <div className="icon"><Icon name="volume-up"/></div>
    </div>
  </div>
);



const MusicPage = () => (
  <Page title="Sign In">
    <div className="music-page">
      <Navigation/>
      <div className="albums">
        {[...Array(1000).keys()].map(i => (
          <div key={i} className="album">
            <div className="art"/>
            <div className="album-title is-size-7">Tigermilk</div>
            <div className="album-artist is-size-7">Belle & Sebastian But what if it's like really long?</div>
          </div>
        ))}
      </div>
      <NowPlaying/>
    </div>
  </Page>
);

export {
  MusicPage,
}

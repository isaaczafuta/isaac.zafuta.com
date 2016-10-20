import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

import Slider from '../Slider';

import './style.css';

class NowPlaying extends Component {
  static propTypes = {
    artist: PropTypes.string.isRequired,
    track: PropTypes.string.isRequired,
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    onSeek: PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      menuOpen: false
    }
  }
  render() {
    const sliderValue = this.props.currentTime / this.props.duration;
    const [formattedCurrentTime, formattedRemainingTime] = this.formatTimes(this.props.currentTime, this.props.duration);

    const menuClasses = classNames({
      'icon': true,
      'active': this.state.menuOpen
    });

    return (
      <div className="NowPlaying">
        <div className="top">
          <div className={menuClasses}>
            <FontAwesome name='bars'
                         size="2x"
                         onClick={this.handleMenuClicked}/>
          </div>
          <div className="info">
            <p className="artist">{this.props.artist}</p>
            <p className="track">{this.props.track}</p>
          </div>
          <div className="icon">
            <FontAwesome name='retweet'
                         size="2x" />
          </div>
        </div>
        <div className="bottom">
          <span className="time-label">{formattedCurrentTime}</span>
          <div className="slider-container">
            <Slider value={sliderValue} onValueChanged={this.handleValueChanged} />
          </div>
          <span className="time-label">-{formattedRemainingTime}</span>
        </div>
      </div>
    );
  }
  handleMenuClicked = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  }
  handleValueChanged = (newValue) => {
    this.props.onSeek(newValue * this.props.duration);
  }
  formatTimes(currentTime, duration) {
    const currentTimeSeconds = Math.floor(currentTime % 60);
    const currentTimeMinutes = Math.floor((currentTime / 60) % 60)
    const currentTimeHours = Math.floor(currentTime / 3600);

    const remainingTime =  duration - currentTime;
    const remainingTimeSeconds = Math.floor(remainingTime % 60);
    const remainingTimeMinutes = Math.floor((remainingTime / 60) % 60)
    const remainingTimeHours = Math.floor(remainingTime / 3600);

    const zeroPad = (x) => ((x < 10 ? "0" : "") + x);

    if (duration >= 3600) {
      const formattedCurrentTime = `${zeroPad(currentTimeHours)}:${zeroPad(currentTimeMinutes)}:${zeroPad(currentTimeSeconds)}`;
      const formattedRemainingTime = `${zeroPad(remainingTimeHours)}:${zeroPad(remainingTimeMinutes)}:${zeroPad(remainingTimeSeconds)}`;
      return [formattedCurrentTime, formattedRemainingTime]
    } else {
      const formattedCurrentTime = `${zeroPad(currentTimeMinutes)}:${zeroPad(currentTimeSeconds)}`;
      const formattedRemainingTime = `${zeroPad(remainingTimeMinutes)}:${zeroPad(remainingTimeSeconds)}`;
      return [formattedCurrentTime, formattedRemainingTime]
    }

  }
}

export default NowPlaying;

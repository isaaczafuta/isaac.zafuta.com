import React, { Component, PropTypes } from 'react';

import './style.css';

class Slider extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onValueChanged: PropTypes.func.isRequired
  }
  render() {
    return (
      <div className="Slider"
           ref={(slider) => {this.slider = slider}} >
        <div className="track"/>
        <div className="handle-container">
          <div className="handle"
               ref={(handle) => {this.handle = handle}}
               onMouseDown={this.clickStarted}
               style={{left: `${100 * this.props.value}%`}} />
        </div>
      </div>
    );
  }
  clickStarted = (e) => {
    this.sliderClientRect = this.slider.getBoundingClientRect();
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener('mousemove', this.mouseMoved);
    document.addEventListener('mouseup', this.clickEnded);
  }
  clickEnded = (e) => {
    delete this.sliderClientRect;
    document.removeEventListener('mousemove', this.mouseMoved);
    document.removeEventListener('mouseup', this.clickEnded);
  }
  mouseMoved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.clientX < this.sliderClientRect.left) {
      this.props.onValueChanged(0);
    } else if (e.clientX > this.sliderClientRect.right) {
      this.props.onValueChanged(1);
    } else {
      const width = this.sliderClientRect.right - this.sliderClientRect.left;
      const x = e.clientX - this.sliderClientRect.left;
      this.props.onValueChanged(x / width);
    }
  }
}

export default Slider;

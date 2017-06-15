import React from 'react';

function transform(str) {
  return { transform: str };
}

const rotate = deg => `rotate(${deg}deg)`;

export default class ClockFace extends React.Component {
  render() {
    const d = this.props.date;
    const millis = d.getMilliseconds();
    const second = d.getSeconds() * 6 + millis * (6 / 1000);
    const minute = d.getMinutes() * 6 + second / 60;
    const hour = ((d.getHours() % 12) / 12) * 360 + 90 + minute / 12;

    const w = window.innerWidth - 25;
    const h = window.innerHeight - 25;
    const x = h < w ? h : w;
    const faceStyle = {
      width: x,
      height: x,
      'background-size': `${x}px ${x}px`,
    };

    return (
      <div className="circle" style={faceStyle}>
        <div className="face">
          <div className="second" style={transform(rotate(second))} />
          <div className="hour" style={transform(rotate(hour))} />
          <div className="minute" style={transform(rotate(minute))} />
        </div>
      </div>
    );
  }
}

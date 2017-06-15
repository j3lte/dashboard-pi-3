import React from 'react';
import ReactDOM from 'react-dom';

import ClockFace from './ClockFace';

console.log(`Window operating at ${window.innerHeight}px height`);
console.log(`Window operating at ${window.innerWidth}px width`);

class AnalogClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.start();
  }

  start() {
    const self = this;
    (function tick() {
      self.setState({ date: new Date() });
      requestAnimationFrame(tick);
    }());
  }

  render() {
    return <ClockFace date={this.state.date} />;
  }
}

ReactDOM.render(<AnalogClock />, document.getElementById('app'));

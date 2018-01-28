import React from 'react';

class Mode extends React.Component {
  render() {
    const nodeEnv = process.env.NODE_ENV;
    return (
      <div id="mode">
      Running in {nodeEnv} mode
      </div>
    );
  }
}

export default Mode;

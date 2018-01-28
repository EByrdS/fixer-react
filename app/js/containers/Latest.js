import React from 'react';
import Rate from '../components/Rate.js';

class Latest extends React.Component {
  render() {
    return (
      <div id="latest">
      <div id="graph-selection">
        <h2>Graph</h2>
      </div>
      <div id="latest-list">
        <h2>Latest</h2>
        <Rate base="USD" quote="MXN"/>
        <Rate base="EUR" quote="MXN"/>
        <Rate base="GBP" quote="MXN"/>
        <Rate base="MXN" quote="USD"/>
        <Rate base="MXN" quote="EUR"/>
        <Rate base="MXN" quote="GBP"/>
      </div>
      </div>
    );
  }
}

export default Latest;

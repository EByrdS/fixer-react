import React from 'react';
import Child from './Child.js';

class Parent extends React.Component {
  render() {
    return (
      <div className="parent">
        <div> This is the parent. </div>
        <Child name="child!"/>
      </div>
    );
  }
}

export default Parent;

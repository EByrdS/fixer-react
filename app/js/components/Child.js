import React from 'react';

class Child extends React.Component {
  render() {
    return (
      <div className="child">
        and this is the <b>{this.props.name}</b>.
      </div>
    );
  }
}

export default Child;

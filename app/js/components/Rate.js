import React from 'react';

class Rate extends React.Component {
  render() {
    var indicator = null;
    if (this.props.went == "up") {
      indicator = <i className="fa fa-caret-up" aria-hidden="true"></i>;
    }
    else {
      indicator = <i className="fa fa-caret-down" aria-hidden="true"></i>;
    }

    return (
      <div className="rate">
      <div className="name">
        {this.props.base}/
        {this.props.quote}
      </div>
      <div className="value">
        {this.props.value.toFixed(4)}
      </div>
      <div className="indicator">
        {indicator}
      </div>
      </div>
    );
  }
}

export default Rate;

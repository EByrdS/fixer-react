import React from 'react';
import Rate from '../components/Rate.js';
import Options from '../components/Options.js';

class Latest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: this.props.base,
      quote: this.props.quote,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      base: nextProps.base,
      quote: nextProps.quote,
    });
  }

  changeBase(newValue) {
    this.setState({ base: newValue });
    this.props.callbackParent({
      base: newValue,
      quote: this.state.quote,
    });
  }

  changeQuote(newValue) {
    this.setState({ quote: newValue });
    this.props.callbackParent({
      base: this.state.base,
      quote: newValue,
    });
  }

  render() {
    return (
      <div id="latest">
      <div id="graph-selection">
        <h2>Graph</h2>
        <Options selected={this.state.base} callbackParent={(newValue) => this.changeBase(newValue)} />
        <Options selected={this.state.quote}  callbackParent={(newValue) => this.changeQuote(newValue)} />
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

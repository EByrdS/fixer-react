import React from 'react';
import Logo from '../components/Logo.js';
import Latest from '../containers/Latest.js';
import Time from './Time.js';
import Chart from '../components/Chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: props.base,
      quote: props.quote,
      days: props.days
    };
  }

  onChildChange(newState) {
    this.setState({
      base: newState.base,
      quote: newState.quote
    });
  }

  swapCurrency() {
    this.setState({
      base: this.state.quote,
      quote: this.state.base,
    });
  }

  changeDays(newDays) {
    this.setState({
      days: newDays,
    });
  }

  updateGraph() {
    // console.log("Graph update!");
  }

  componentDidMount() {
    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  render() {
    return (
      <div>
        <div id="left-pane">
          <div id="title">
            <div id="base">
              {this.state.base}
            </div>
            <div id="swap">
              <i className="fa fa-exchange" aria-hidden="true"
                 onClick={() => this.swapCurrency()}></i>
            </div>
            <div id="quote">
              {this.state.quote}
            </div>
          </div>
          <Time selected="7"
            callbackParent={(newDays) => this.changeDays(newDays)}/>
          <div id="chart-container">
            <Chart base={this.state.base}
                   quote={this.state.quote}
                   days={this.state.days}/>
          </div>
        </div>
        <div id="right-pane">
          <Logo />
          <Latest base={this.state.base}
                  quote={this.state.quote}
                  callbackParent={(newState) => this.onChildChange(newState)}/>
        </div>
      </div>
    );
  }
}

export default App;

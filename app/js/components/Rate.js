import React from 'react';

class Rate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: props.base,
      quote: props.quote,
      value: null,
      went: null,
      date: null
    };
  }

  componentDidMount() {
    fetch("https://api.fixer.io/" +
        "latest?symbols=" + this.state.quote + "&base=" + this.state.base)
      .then(res => res.json())
      .then(
        (result) => {
          var date = new Date(result.date);
          date.setDate(date.getDate() - 1);
          fetch("https://api.fixer.io/" +
              date.getFullYear() + "-" +
              ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
              ("0" + date.getDate()).slice(-2) +
              "?symbols=" + this.state.quote + "&base=" + this.state.base)
            .then(res => res.json())
            .then(
              (historic) => {
                const previous = historic.rates[this.state.quote];
                const current = result.rates[this.state.quote];
                var went = null;
                if (current > previous) {
                  went = "up";
                }
                else if (current < previous) {
                  went = "down";
                }
                this.setState({
                  value: result.rates[this.state.quote],
                  date: result.date,
                  went: went,
                });
              },
              (error) => {
                console.log(error);
                this.setState({
                  value: result.rates[this.state.quote]
                });
              }
            );
        },
        (error) => {
          this.setState({
            value: null,
            went: null
          });
        }
      );

  }

  render() {
    var indicator = null;
    if (this.state.went == "up") {
      indicator = <i className="fa fa-caret-up" aria-hidden="true"></i>;
    }
    else if (this.state.went == "down") {
      indicator = <i className="fa fa-caret-down" aria-hidden="true"></i>;
    }

    var value = null;
    if (this.state.value != null) {
      value = this.state.value.toFixed(4);
    }

    return (
      <div className="rate">
      <div className="date">
        {this.state.date}
      </div>
      <div className="name">
        {this.state.base}/
        {this.state.quote}
      </div>
      <div className="value">
        {value}
      </div>
      <div className="indicator">
        {indicator}
      </div>
      </div>
    );
  }
}

export default Rate;

import React from 'react';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

charts(FusionCharts);

var myDataSource = {
  chart: {
    xAxisName: "Time",
    yAxisName: "Value",
  },
  data: []
};

class Chart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      base: props.base,
      quote: props.quote,
      days: props.days,
      filterSouce: '',
    };
  }

  componentWillReceiveProps() {
    this.setState({
      filterSouce: 'btn_update_data'
    });
  }

  componentDidMount() {
    console.log("Will fetch the data from fixer.io");
    fetch("https://api.fixer.io/" +
        "latest?symbols=" + this.state.quote + "&base=" + this.state.base)
      .then(res => res.json())
      .then((result) => {
        console.log("Got the data from fixer.io");
        myDataSource.data.push({ label: result.date, value: result.rates[this.state.quote] });
        this.setState({
          filterSouce: 'btn_update_data',
        });
        console.log(myDataSource);
      });
  }

  render() {
    var historicForexChart = {
      type: "line",
      renderAt: "chart-container",
      width: "400",
      height: "300",
      dataFormat: "JSON",
      dataSource: myDataSource,
      eventTarget: this.state.eventTarget,
      impactedBy: ['btn-update-data']
    };

    return (
      <div>
        <ReactFC {...historicForexChart} />
      </div>
    );
  }
}

export default Chart;

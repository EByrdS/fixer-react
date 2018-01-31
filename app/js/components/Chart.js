import React from 'react';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';

charts(FusionCharts);

var myDataSource = {
  chart: {
    xAxisName: "Date",
    yAxisName: "Value",
    yAxisMaxValue: "",
    palette: "3",
    labelDisplay: "rotate",
    slantLabels: "1",
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
      dataSource: myDataSource,
      dataArray: [],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      base: newProps.base,
      quote: newProps.quote,
      days: newProps.days
    }, this.updateChart());
  }

  addChartObject(chartObject) {
    var updatedArray = this.state.dataArray;
    updatedArray.unshift(chartObject);
    var intermediateData = Object.assign({}, this.state.dataSource);
    intermediateData.chart.yAxisMaxValue = parseFloat(chartObject.value, 10) * 2;
    intermediateData.data = updatedArray;
    this.setState({
      dataSource: intermediateData,
      dataArray: updatedArray,
    });
  }

  recursiveFetch(daysForward) {
    var latestDate = new Date(this.state.latestDate);
    latestDate.setDate(latestDate.getDate() - (this.state.days - daysForward));
    fetch("https://api.fixer.io/" +
        latestDate.getFullYear() + "-" +
        ("0" + (latestDate.getMonth() + 1)).slice(-2) + "-" +
        ("0" + latestDate.getDate()).slice(-2) +
        "?symbols=" + this.state.quote + "&base=" + this.state.base)
      .then(res => res.json())
      .then((result) => {
        var chartObject = {
          label: result.date,
          value: result.rates[this.state.quote],
        };
        this.addChartObject(chartObject, daysForward);
        if (daysForward > 1) {
          this.recursiveFetch(daysForward - 1);
        }
      });
  }

  updateChart() {
    fetch("https://api.fixer.io/" +
        "latest?symbols=" + this.state.quote + "&base=" + this.state.base)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          latestDate: result.date,
          dataArray: [],
        });
        this.recursiveFetch(this.state.days);
      });
  }

  componentDidMount() {
    this.updateChart();
  }

  render() {
    var historicForexChart = {
      type: "line",
      renderAt: "chart-container",
      width: "400",
      height: "300",
      dataFormat: "JSON",
      dataSource: this.state.dataSource,
    };

    return (
      <div>
        <ReactFC {...historicForexChart} />
      </div>
    );
  }
}

export default Chart;

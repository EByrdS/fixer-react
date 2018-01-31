import React from 'react';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  changeOption(event) {
    this.setState({
      selected: event.target.value,
    });
    this.props.callbackParent(event.target.value);
  }

  render() {
    return (
      <div id="time">
        <input type="radio" name="time" value="60" id="2M"
          checked={this.state.selected === '60'}
          onChange={(event) => this.changeOption(event)}/>
        <label htmlFor="2M">2M</label>

        <input type="radio" name="time" value="30" id="1M"
          checked={this.state.selected === '30'}
          onChange={(event) => this.changeOption(event)}/>
        <label htmlFor="1M">1M</label>

        <input type="radio" name="time" value="14" id="2W"
          checked={this.state.selected === '14'}
          onChange={(event) => this.changeOption(event)}/>
        <label htmlFor="2W">2W</label>

        <input type="radio" name="time" value="7" id="7D"
          checked={this.state.selected === '7'}
          onChange={(event) => this.changeOption(event)}/>
        <label htmlFor="7D">7D</label>

        <input type="radio" name="time" value="3" id="3D"
          checked={this.state.selected === '3'}
          onChange={(event) => this.changeOption(event)}/>
        <label htmlFor="3D">3D</label>
      </div>
    );
  }
}

export default Time;

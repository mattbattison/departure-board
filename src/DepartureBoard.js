import React from "react";
import StationInfo from "./StationInfo";
import StationSelector from "./StationSelector";
import Clock from "./Clock";

class DepartureBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line: this.props.initialLine,
      stationCode: this.props.initialStationCode
    };
    this.handleStationChange = this.handleStationChange.bind(this);
  }

  handleStationChange(line, stationCode) {
    this.setState({
      line: line,
      stationCode: stationCode
    });
  }

  render() {
    return (
      <div className="board">
        <StationSelector onStationSelected={this.handleStationChange} />
        <StationInfo
          line={this.state.line}
          stationCode={this.state.stationCode}
        />
        <Clock />
      </div>
    );
  }
}

export default DepartureBoard;

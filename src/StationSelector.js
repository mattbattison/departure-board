import React from "react";

class StationSelector extends React.Component {
  lines = {
    bakerloo: "Bakerloo",
    central: "Central",
    circle: "Circle",
    district: "District",
    hammersmith: "Hammersmith & City",
    jubilee: "Jubilee",
    metropolitan: "Metropolitan",
    northern: "Northern",
    piccadilly: "Piccadilly",
    victoria: "Victoria",
    waterlooandcity: "Waterloo & City"
  };

  constructor(props) {
    super(props);
    this.state = {
      line: null,
      stations: null,
      stationCode: null
    };
    this.handleLineChange = this.handleLineChange.bind(this);
    this.handleStationChange = this.handleStationChange.bind(this);
  }

  handleStationChange(event) {
    var selectedStation = event.target.value !== "" ? event.target.value : null;
    this.setState({
      stationCode: selectedStation
    });
    this.props.onStationSelected(this.state.line, selectedStation);
  }

  handleLineChange(event) {
    var selectedLine = event.target.value !== "" ? event.target.value : null;

    if (selectedLine != null) {
      fetch(
        process.env.REACT_APP_TRANSPORT_API_URL +
          "/v3/uk/tube/" +
          selectedLine +
          ".json"
      )
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then(data => {
          this.setState({
            line: selectedLine,
            stations: data.stations,
            stationCode: null
          });
        })
        .catch(e => {
          this.setState({
            line: null,
            stations: null,
            stationCode: null
          });
          console.log(e);
        });
    } else {
      this.setState({
        line: null,
        stations: null,
        stationCode: null
      });
    }

    this.props.onStationSelected(selectedLine, null);
  }

  render() {
    return (
      <div>
        <select
          value={this.state.line != null ? this.state.line : ""}
          onChange={this.handleLineChange}
        >
          <option value="">Select a line...</option>
          {Object.entries(this.lines).map(line => (
            <option key={line[0]} value={line[0]}>
              {line[1]}
            </option>
          ))}
        </select>
        <select
          value={this.state.stationCode != null ? this.state.stationCode : ""}
          onChange={this.handleStationChange}
        >
          <option value="">Select a station...</option>
          {this.state.stations == null
            ? ""
            : this.state.stations.map(station => (
                <option key={station.station_code} value={station.station_code}>
                  {station.name}
                </option>
              ))}
        </select>
      </div>
    );
  }
}

export default StationSelector;

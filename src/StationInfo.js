import React from "react";

class StationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stationData: null,
      message: null
    };
  }

  refresh() {
    this.setState({
      stationData: null,
      message: null
    });

    if (this.props.line == null || this.props.stationCode == null) {
      this.setState({
        message: "Select a station..."
      });
      return;
    }

    fetch(
      process.env.REACT_APP_TRANSPORT_API_URL + "/v3/uk/tube/" +
        this.props.line +
        "/" +
        this.props.stationCode +
        "/live.json"
    )
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          stationData: data
        });
      })
      .catch(e => {
        this.setState({
          message: e.message
        });
        console.log(e);
      });
  }

  componentDidMount() {
    this.refresh();
    this.timer = setInterval(() => this.refresh(), 30000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.stationCode !== prevProps.stationCode) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    // If we have data then show it...
    if (this.state.stationData != null) {
      return (
        <div>
          <h1>{this.state.stationData.station_name.replace(/\.$/, "")}</h1>
          {Object.entries(this.state.stationData.lines).map(entry => (
            <LineInfo
              key={entry[0]}
              name={entry[0]}
              platforms={entry[1].platforms}
            />
          ))}
        </div>
      );
    }

    // If there's no data but there's a message then show that...
    if (this.state.message != null) {
      return <h1>{this.state.message}</h1>;
    }

    // Otherwise we must be waiting for data...
    return <h1>Loading...</h1>;
  }
}

class LineInfo extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
        {Object.entries(this.props.platforms).map(entry => (
          <PlatformInfo
            key={entry[0]}
            name={entry[0]}
            departures={entry[1].departures}
          />
        ))}
      </div>
    );
  }
}

class PlatformInfo extends React.Component {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <table>
          <tbody>
            {this.props.departures.slice(0, 4).map((d, index) => (
              <Departure key={index} departure={d} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

class Departure extends React.Component {
  render() {
    var mins = this.props.departure.best_departure_estimate_mins;
    var minsText;
    if (mins === 0) {
      minsText = "Due";
    } else if (mins === 1) {
      minsText = "1 min";
    } else {
      minsText = mins + " mins";
    }

    return (
      <tr>
        <td>{this.props.departure.destination_name}</td>
        <td>{minsText}</td>
      </tr>
    );
  }
}

export default StationInfo;

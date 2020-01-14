import React from "react";
import DepartureBoard from "./DepartureBoard";
import "./App.css";

class App extends React.Component {
  render() {
    return <DepartureBoard initialLine="jubilee" initialStationCode="CNT" />;
  }
}

export default App;

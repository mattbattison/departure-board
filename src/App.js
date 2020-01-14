import React from "react";
import DepartureBoard from "./DepartureBoard";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <DepartureBoard
        initialLine={process.env.REACT_APP_INITIAL_LINE}
        initialStationCode={process.env.REACT_APP_INITIAL_STATION}
      />
    );
  }
}

export default App;

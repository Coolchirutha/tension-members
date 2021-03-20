// Packages import
import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

// Component imports
import Homepage from "./components/Homepage/Homepage";
import WeldInput from "./components/WeldInput/WeldInput";

// File imports
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App" id="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/WeldInput" component={WeldInput} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

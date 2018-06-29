import * as React from "react";
import { AppBar } from "../AppBar";
import { Grid } from "../Grid";

class App extends React.Component {
  public render() {
    const data = require("../../configuration/data/fakedata.json");

    return (
      <div>
        <AppBar />
        <Grid data={data} />
      </div>
    );
  }
}

export default App;

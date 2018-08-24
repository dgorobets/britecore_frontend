import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";

import Home from "./pages/Home";
import RiskType from "./pages/RiskType";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <div>
          <CssBaseline />
          <Route exact path="/" component={Home} />
          <Route path="/:id" component={RiskType} />
        </div>
      </Router>
    </MuiPickersUtilsProvider>
  );
}

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./content/home/Home";
import { Printing } from "./content/printing/pages/Printing";
import { VespaLicensePlateHolderPage } from "./content/printing/pages/VespaLicensePlateHolderPage";
import { PowerStripBracketPage } from "./content/printing/pages/PowerStripBracketPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ee4bb5",
    },
  },
});

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/printing" component={Printing} />
        <Route
          exact
          path="/printing/bracket"
          component={PowerStripBracketPage}
        />
        <Route
          exact
          path="/printing/vespa-plate-holder"
          component={VespaLicensePlateHolderPage}
        />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

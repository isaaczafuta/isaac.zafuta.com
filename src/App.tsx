import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./content/home/Home";
import {
  Printing,
  printingObjectPages,
} from "./content/printing/pages/Printing";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    frostbite: PaletteColor;
    blueJeans: PaletteColor;
    scarlet: PaletteColor;
    majorelle: PaletteColor;
    amber: PaletteColor;
  }

  interface PaletteOptions {
    frostbite: PaletteColorOptions;
    blueJeans: PaletteColorOptions;
    scarlet: PaletteColorOptions;
    majorelle: PaletteColorOptions;
    amber: PaletteColorOptions;
  }
}

const FROSTBITE = "#ee4bb5";
const BLUE_JEANS = "#3cb5ff";
const SCARLET = "#fc2f00";
const MAJORELLE = "#574ae2";
const AMBER = "#ffbf00";

const theme = createMuiTheme({
  palette: {
    frostbite: { main: FROSTBITE },
    blueJeans: { main: BLUE_JEANS },
    scarlet: { main: SCARLET },
    majorelle: { main: MAJORELLE },
    amber: { main: AMBER },

    primary: { main: FROSTBITE },
    secondary: { main: BLUE_JEANS },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        a: {
          textDecoration: "none",
          color: "inherit",
        },
      },
    },
  },
});

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/printing" component={Printing} />
        {[...printingObjectPages]}
      </Switch>
    </BrowserRouter>
  </ThemeProvider>
);

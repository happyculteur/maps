import { MuiThemeProvider } from "@material-ui/core";
import * as dotenv from "dotenv";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { App } from "./components/App";
import { i18next } from "./configuration/i18next";
import { createDefaultTheme } from "./configuration/materialUi";
import { sentry } from "./configuration/sentry";
import { registerServiceWorker } from "./configuration/serviceWorker";

dotenv.config();
sentry();

const theme = createDefaultTheme();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </MuiThemeProvider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();

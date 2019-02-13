import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import { sentry } from "./configuration/sentry";
import { registerServiceWorker } from "./configuration/serviceWorker";
import "./configuration/i18next";

sentry();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

registerServiceWorker();

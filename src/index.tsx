import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import "./configuration/i18next";
import { sentry } from "./configuration/sentry";
import { registerServiceWorker } from "./configuration/serviceWorker";

sentry();

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);

registerServiceWorker();

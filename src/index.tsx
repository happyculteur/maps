import React from "react";
import ReactDOM from "react-dom";
import { fontAwesome } from "./configuration/fontAwesome";
import "./configuration/i18next";
import { sentry } from "./configuration/sentry";
import { registerServiceWorker } from "./configuration/serviceWorker";
import { Layout } from "./Layout";

fontAwesome();
sentry();

ReactDOM.render(<Layout />, document.getElementById("root") as HTMLElement);
registerServiceWorker();

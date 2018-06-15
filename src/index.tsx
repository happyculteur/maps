import * as dotenv from 'dotenv';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from "react-i18next";
import { App } from './components/App';
import { i18next } from "./configuration/i18next";
import { sentry } from "./configuration/sentry";
import { registerServiceWorker } from './configuration/serviceWorker';

dotenv.config();
sentry();

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

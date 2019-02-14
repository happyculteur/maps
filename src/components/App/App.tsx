import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import * as React from "react";
import { Helmet } from "react-helmet";
import { defaultTheme } from "../../configuration/materialUi";
import { AppBar } from "../AppBar";

class App extends React.Component {
  public render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <div className="application">
          <Helmet>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta name="theme-color" content="#000000" />
            {/* manifest.json provides metadata used when your web app is added to the
                homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/ */}
            <link
              rel="manifest"
              href={process.env.PUBLIC_URL + "/manifest.json"}
            />
            <link
              rel="shortcut icon"
              href={process.env.PUBLIC_URL + "/favicon.ico"}
            />
            {/* Notice the use of %PUBLIC_URL% in the tags above.
                It will be replaced with the URL of the `public` folder during the build.
                Only files inside the `public` folder can be referenced from the HTML.

                Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
                work correctly both with client-side routing and a non-root public URL.
                Learn how to configure a non-root public URL by running `npm run build`. */}
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
            <title>Happyculteur Maps</title>
          </Helmet>
          <AppBar />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;

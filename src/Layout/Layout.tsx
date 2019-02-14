import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppBar } from "../components/AppBar";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { defaultTheme } from "../configuration/materialUi";
import { Router } from "../Router";

const useStyles = makeStyles({
  gridContainer: {
    display: "grid",
    gridTemplateAreas: `
    'AppBar'
    'Router'
    'Footer'
 `,
    gridTemplateColumns: "1fr",
    gridTemplateRows: "7% 86% 7%",
    height: "100vh",
    width: "100%"
  }
});

const Layout: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <div className={classes.gridContainer}>
        <AppBar />
        <Router />
        <Footer />
      </div>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Layout;

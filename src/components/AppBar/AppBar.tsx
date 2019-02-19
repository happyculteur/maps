import {
  AppBar as MuiAppBar,
  Button,
  IconButton,
  Toolbar
} from "@material-ui/core";
import GridOn from "@material-ui/icons/GridOn";
import Map from "@material-ui/icons/Map";
import VerticalSplit from "@material-ui/icons/VerticalSplit";
import { makeStyles } from "@material-ui/styles";
import { Link } from "@reach/router";
import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assests/happyculteur-logo.png";

export const useStyles = makeStyles(theme => ({
  AppBar: {
    flexGrow: 1,
    gridArea: "AppBar",
    zIndex: 1
  },
  Logo: {
    height: "60px",
    width: "auto"
  },
  SurveyButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    },
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.light,
    marginLeft: "auto"
  },
  button: {
    "&:hover": {
      color: theme.palette.secondary.dark
    },
    color: theme.palette.primary.light
  },
  buttons: {
    borderLeft: "solid black 2px",
    marginLeft: "2%"
  },
  empty: {
    flexGrow: 1
  }
}));

export const AppBar: React.FunctionComponent = props => {
  const classes = useStyles();
  const i18n = useTranslation();

  return (
    <div className={classes.AppBar}>
      <MuiAppBar position="static" color="default">
        <Toolbar>
          <img className={classes.Logo} src={logo} alt="Logo" />
          <div className={classes.buttons}>
            <Link to="/map">
              <IconButton className={classes.button} aria-label="Menu">
                <Map />
              </IconButton>
            </Link>
            <Link to="/list">
              <IconButton className={classes.button} aria-label="Menu">
                <GridOn />
              </IconButton>
            </Link>
            <Link to="/">
              <IconButton className={classes.button} aria-label="Menu">
                <VerticalSplit />
              </IconButton>
            </Link>
          </div>
          <div className={classes.empty} />
          <Button
            className={classes.SurveyButton}
            href={process.env.REACT_APP_HAPPYCULTEUR_SURVEY}
            data-e2e="SurveyButton"
          >
            {i18n.t("Take the survey!")}
          </Button>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

export default AppBar;

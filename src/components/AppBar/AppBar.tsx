import { AppBar as MuiAppBar, Button, Toolbar } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Link } from "@reach/router";
import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assests/happyculteur-logo.png";

export const useStyles = makeStyles((theme: Theme) => ({
  AppBar: {
    flexGrow: 1,
    gridArea: "AppBar",
    zIndex: 2
  },
  Logo: {
    height: "60px",
    width: "auto"
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
      <MuiAppBar position="static" color="primary">
        <Toolbar>
          <Link to="/">
            <img className={classes.Logo} src={logo} alt="Logo" />
          </Link>
          <div className={classes.empty} />
          <Button
            variant="contained"
            color="secondary"
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

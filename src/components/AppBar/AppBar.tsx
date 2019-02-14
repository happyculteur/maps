import { default as MuiAppBar } from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    flexGrow: 1
  },
  surveyButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark
    },
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.light,
    marginLeft: "auto"
  }
}));

export const AppBar: React.SFC = props => {
  const classes = useStyles();
  const i18n = useTranslation();

  return (
    <div className={classes.root}>
      <MuiAppBar position="static" color="default">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Button
            className={classes.surveyButton}
            color="primary"
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

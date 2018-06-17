import { default as MuiAppBar } from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { TranslationFunction } from "i18next";
import * as React from "react";
import { translate } from "react-i18next";

const styles = (theme: Theme) =>
  createStyles({
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
      marginLeft: "auto"
    }
  });

interface IAppBarInjectedProps {
  t?: TranslationFunction;
}

export interface IAppBarProps
  extends WithStyles<typeof styles>,
    IAppBarInjectedProps {}

export const AppBar: React.SFC<IAppBarProps> = props => {
  const { classes, t = (sentence: any) => sentence } = props;
  return (
    <div className={classes.root}>
      <MuiAppBar position="static">
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
            {t("Take the survey!")}
          </Button>
        </Toolbar>
      </MuiAppBar>
    </div>
  );
};

const AppBarWithTranslation = translate("translations")(AppBar);
const AppBarWithTranslationAndStyles = withStyles(styles)(
  AppBarWithTranslation
);

export default AppBarWithTranslationAndStyles;

import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React from "react";
import "./ThanksIcon.css";

const useStyles = makeStyles((theme: Theme) => ({
  square: {
    aligItems: "center",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  thanks: {
    fontFamily: "againts",
    fontSize: "100px",
    fontWeight: "normal",
    letterSpacing: "3px",
    textShadow: "0 3px 15px rgba(0,0,0,0.2)"
  },
  underline: {
    fontFamily: "thunder",
    fontSize: "100px",
    marginTop: "-25px",
    transform: "scale(-1, 1)"
  },
  wrap: {
    display: "flex",
    justifyContent: "center"
  }
}));

interface IThanksIcon {
  className: string;
}

const ThanksIcon: React.FunctionComponent<IThanksIcon> = props => {
  const classes = useStyles();

  return (
    <div className={classnames(classes.wrap, props.className)}>
      <div className={classes.square}>
        <div className={classes.thanks}>Thanks</div>
        <div className={classes.underline}>z</div>
      </div>
    </div>
  );
};

export default React.memo(ThanksIcon);

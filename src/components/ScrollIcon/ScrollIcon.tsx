import { Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";

// Thanks to Geoffrey Crofte for the animation
// From https://codepen.io/GeoffreyCrofte/pen/dYpObx

const useStyles = makeStyles((theme: Theme) => ({
  "@keyframes mouse-scroll": {
    "0%": {
      opacity: 0
    },
    "100%": {
      opacity: 1
    },
    "50%": {
      opacity: 0.5
    }
  },
  "@keyframes mouse-wheel": {
    "0%": {
      opacity: 1,
      transform: "translateY(0)"
    },
    "100%": {
      opacity: 0,
      transform: "translateY(20px)"
    }
  },
  iconArrows: {
    "&::after": {
      animationDelay: ".3s"
    },
    "&::after, &::before": {
      animation: `$mouse-scroll 1s infinite`,
      animationDirection: "alternate",
      borderBottom: `1px solid ${theme.palette.secondary.dark}`,
      borderRight: `1px solid ${theme.palette.secondary.dark}`,
      content: "''",
      display: "block",
      height: "15px",
      transform: "rotate(45deg)",
      width: "15px"
    },
    "&::before": {
      animationDelay: ".1s"
    }
  },
  iconScroll: {
    alignItems: "center",
    color: theme.palette.secondary.dark,
    display: "flex",
    flexDirection: "column"
  },
  mouse: {
    border: `2px solid ${theme.palette.secondary.main}`,
    borderRadius: "10px",
    display: "flex",
    height: "45px",
    justifyContent: "center",
    width: "30px"
  },
  wheel: {
    animation: `$mouse-wheel 1.2s ease infinite`,
    background: `${theme.palette.secondary.main}`,
    borderRadius: "50%",
    display: "block",
    height: "8px",
    position: "relative",
    width: "4px"
  }
}));

const ScrollIcon: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.iconScroll}>
      <div className={classes.mouse}>
        <div className={classes.wheel} />
      </div>
      <Typography variant="overline" color="inherit">
        {/* TODO: Translation */}
        Scroll to load more
      </Typography>
      <div className={classes.iconArrows} />
    </div>
  );
};

export default ScrollIcon;

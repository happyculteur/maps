import { makeStyles } from "@material-ui/styles";
import { Router as ReachRouter } from "@reach/router";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { MapAndCardList } from "../pages/MapAndCardList";

const useStyles = makeStyles({
  Router: {
    "@global": {
      "::-webkit-scrollbar": {
        backgroundColor: "#F5F5F5",
        width: "10px"
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#F90",
        backgroundImage: `-webkit-linear-gradient(
        90deg,
        rgba(255, 255, 255, .2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, .2) 50%,
        rgba(255, 255, 255, .2) 75%,
        transparent 75%,
        transparent
      )`
      },
      "::-webkit-scrollbar-track": {
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        backgroundColor: "#F5F5F5"
      }
    },
    gridArea: "Router",
    height: "100%",
    zIndex: 0
  }
});

const Router: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <ReachRouter className={classes.Router}>
      <MapAndCardList default={true} path="/" />
    </ReachRouter>
  );
};

export default Router;

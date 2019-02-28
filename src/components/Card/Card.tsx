import {
  Button,
  Card as MuiCard,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import Email from "@material-ui/icons/Email";
import GpsFixed from "@material-ui/icons/GpsFixed";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import honey from "../../assests/002-honey-6.svg";
import { IUser } from "../../types";

const useStyles = makeStyles(theme => ({
  Card: {
    alignContent: "space-around",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "10px"
  },
  CardActions: {
    borderTop: `2px solid ${theme.palette.secondary.main}`,
    display: "flex",
    justifyContent: "space-around",
    width: "100%"
  },
  CardContent: {
    alignItems: "center",
    display: "flex"
  },
  CardHeader: {
    textAlign: "center"
  },
  avatar: {
    height: "20%",
    margin: 10,
    width: "20%"
  },
  button: {
    borderLeft: `2px solid ${theme.palette.secondary.main}`,
    height: "100%",
    width: "50%"
  },
  content: {
    width: "75%"
  }
}));

interface ICardOwnProps {
  user: IUser;
}

const Card: React.FunctionComponent<ICardOwnProps> = props => {
  const classes = useStyles();

  return (
    <MuiCard className={classes.Card}>
      <div>
        <CardHeader
          title={props.user.information.name}
          subheader={props.user.information.category}
          className={classes.CardHeader}
        />
        <CardContent className={classes.CardContent}>
          <img alt="USER TYPE" src={honey} className={classes.avatar} />
          <div className={classes.content}>
            <Typography variant="subtitle1">
              Interest: {props.user.information.interest}
            </Typography>
            <Typography variant="subtitle2">
              Experience: {props.user.information.level}
            </Typography>
          </div>
        </CardContent>
      </div>
      <div className={classes.CardActions}>
        <Button className={classes.button}>
          <GpsFixed />
        </Button>
        <Button className={classes.button}>
          <Email />
        </Button>
      </div>
    </MuiCard>
  );
};

export default Card;

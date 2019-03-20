import {
  Avatar,
  Card as MuiCard,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import badge from "../../assests/ispartner.svg";
import { IInformation, userInterest } from "../../types";

const useStyles = makeStyles(theme => ({
  Card: {
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
    display: "flex",
    width: "100%"
  },
  CardHeader: {
    alignItems: "center",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    textAlign: "center",
    width: "100%"
  },
  avatar: {
    display: "flex",
    height: "25%",
    justifyContent: "center",
    width: "25%"
  },
  button: {
    borderLeft: `2px solid ${theme.palette.secondary.main}`,
    height: "100%",
    width: "50%"
  },
  content: {
    padding: "5%",
    width: "100%"
  },
  primary: {
    maxWidth: "12vw",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  title: {
    width: "50%"
  }
}));

interface ICardOwnProps {
  actions: (className: string) => {};
  avatar: string;
  children: (className: string) => JSX.Element;
  isPartner?: boolean;
  user: IInformation;
}

const Card: React.FunctionComponent<ICardOwnProps> = props => {
  const classes = useStyles();

  return (
    <MuiCard className={classes.Card}>
      <div className={classes.CardHeader}>
        <div className={classes.avatar}>
          <Avatar alt="Happyculteur partner!" src={props.avatar} />
        </div>
        <div className={classes.title}>
          <Typography variant="h5" className={classes.primary}>
            {props.user.primary}
          </Typography>
          <Typography variant="body1">{props.user.category}</Typography>
        </div>
        <div className={classes.avatar}>
          {props.isPartner && (
            <Avatar alt="Happyculteur partner!" src={badge} />
          )}
        </div>
      </div>
      <CardContent className={classes.CardContent}>
        {props.children(classes.content)}
        {props.user.interests && (
          <>
            <div className={classes.content}>
              <Typography variant="subtitle1">
                <span>Interest:</span>
                <ul>
                  {props.user.interests.map((interest, index) => (
                    <li key={index}>
                      <Typography variant="subtitle2">
                        {userInterest[interest.toString()]}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Typography>
            </div>
          </>
        )}
      </CardContent>
      <div className={classes.CardActions}>{props.actions(classes.button)}</div>
    </MuiCard>
  );
};

export default Card;

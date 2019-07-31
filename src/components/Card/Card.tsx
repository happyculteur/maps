import {
  Avatar,
  Card as MuiCard,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import badge from "../../assests/ispartner.svg";
import { UsersContext } from "../../context/UsersContext";
import { IInformation, userCategory, userInterest } from "../../types";

const useStyles = makeStyles(theme => ({
  Card: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "10px",
    maxHeight: "50%",
    opacity: 1,
    transition: "opacity 1s, max-height 1s, margin 1s"
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
  focus: {
    border: `3px solid ${theme.palette.secondary.main}`
  },
  invisible: {
    margin: 0,
    maxHeight: "0px",
    opacity: 0,
    transition: "opacity 1s, max-height 1s, margin 1s"
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

export interface IActionsTrigger {
  focusMapOnLocation: (
    locationToFocus: number[]
  ) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  sendEmail: (
    to: string,
    subject: string,
    body: string
  ) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface ICardOwnProps {
  actions: (className: string, trigger: IActionsTrigger) => {};
  avatar: string;
  children: (className: string) => JSX.Element;
  isPartner?: boolean;
  user: IInformation;
}

const Card: React.FunctionComponent<ICardOwnProps> = props => {
  const i18n = useTranslation();
  const classes = useStyles();
  const { focus, setFocus } = React.useContext(UsersContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardRef = ref && ref.current && ref.current.parentElement;
    const cardListRef = cardRef && cardRef.parentElement;

    if (_.isEqual(props.user.location, focus) && cardRef && cardListRef) {
      cardListRef.scroll({
        behavior: "smooth",
        left: 0,
        top:
          cardRef.offsetTop -
          cardListRef.offsetTop -
          cardListRef.offsetHeight +
          cardRef.offsetHeight * 2
      });
    }
  }, [focus]);

  const focusMapOnLocation: (
    locationToFocus: number[]
  ) => (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void = locationToFocus => event => {
    setFocus(locationToFocus);
  };
  const sendEmail: (
    to: string,
    subject: string,
    body: string
  ) => (event: React.MouseEvent<HTMLElement, MouseEvent>) => void = (
    to,
    subject,
    body
  ) => event => {
    window.open(`mailto:${to}?subject=${subject}&body=${body}`);
  };

  const actionsTrigger = {
    focusMapOnLocation,
    sendEmail
  };

  return (
    <MuiCard
      className={`${classes.Card} ${_.isEqual(props.user.location, focus) &&
        classes.focus} ${!props.user.isVisible && classes.invisible}`}
    >
      <div className={classes.CardHeader} ref={ref}>
        <div className={classes.avatar}>
          <Avatar src={props.avatar} />
        </div>
        <div className={classes.title}>
          <Typography variant="h5" className={classes.primary}>
            {props.user.primary}
          </Typography>
          <Typography variant="body1">
            {i18n.t(userCategory[props.user.category])}
          </Typography>
        </div>
        <div className={classes.avatar}>
          {props.isPartner && (
            <Avatar alt={i18n.t("Happyculteur partner!")} src={badge} />
          )}
        </div>
      </div>
      <CardContent className={classes.CardContent}>
        {props.children(classes.content)}
        {props.user.interests && (
          <>
            <div className={classes.content}>
              <Typography variant="subtitle1">
                <span>{i18n.t("Interests:")}</span>
                <ul>
                  {props.user.interests.map((interest, index) => (
                    <li key={index}>
                      <Typography variant="subtitle2">
                        {i18n.t(userInterest[interest])}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </Typography>
            </div>
          </>
        )}
      </CardContent>
      <div className={classes.CardActions}>
        {props.actions(classes.button, actionsTrigger)}
      </div>
    </MuiCard>
  );
};

export default Card;

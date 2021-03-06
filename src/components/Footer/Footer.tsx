import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import { Link } from "@reach/router";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  Footer: {
    alignItems: "flex-end",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px",
    boxShadow: `
    -1px -2px 4px -1px rgba(0,0,0,0.2),
    -1px -4px 5px -1px rgba(0,0,0,0.14),
    -1px -1px 10px -1px rgba(0,0,0,0.12)
    `,
    display: "flex",
    gridArea: "Footer",
    justifyContent: "space-between",
    padding: "0 5px",
    zIndex: 2
  },
  LinkIconIcon: {
    "&:hover": {
      color: theme.palette.secondary.dark
    },
    color: theme.palette.primary.dark,
    textDecoration: "none"
  },
  Social: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  link: {
    "&::after": {
      background: theme.palette.secondary.dark,
      content: "''",
      height: "1px",
      left: "0",
      opacity: 0,
      position: "absolute",
      top: "80%",
      transform: "translateY(-5px)",
      transition: "height 0.3s, opacity 0.3s, transform 0.3s",
      width: "100%"
    },
    "&:hover::after, &:hover::after": {
      height: "5px",
      opacity: 1,
      transform: "translateY(0px)"
    },
    color: theme.palette.primary.dark,
    display: "inline-block",
    outline: "none",
    padding: "0 0 10px",
    position: "relative",
    textDecoration: "none",
    textShadow: "0 0 1px rgba(255,255,255,0.3)"
  }
}));

const Footer: React.FunctionComponent = () => {
  const classes = useStyles();

  /* TODO: Translation */
  return (
    <div className={classes.Footer}>
      <div>
        <Typography variant="overline">
          <a
            className={classes.link}
            href={process.env.REACT_APP_HAPPYCULTEUR_LINK_COPYRIGHT}
          >
            HAPPYCULTEUR © COPYRIGHT 2019. TOUS DROITS RESERVES
          </a>
        </Typography>
      </div>
      <div>
        <Typography variant="overline">
          <a
            className={classes.link}
            href={process.env.REACT_APP_HAPPYCULTEUR_LINK_LEGAL}
          >
            MENTIONS LEGALES
          </a>
        </Typography>
      </div>
      <div>
        <Typography variant="overline">
          <Link className={classes.link} to="thanks">
            SPECIAL THANKS
          </Link>
        </Typography>
      </div>
      <div className={classes.Social}>
        <a
          className={classes.LinkIconIcon}
          href="https://www.facebook.com/happyculteur.co/"
        >
          <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
        </a>
        <a
          className={classes.LinkIconIcon}
          href="https://twitter.com/happyculteur_"
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
        </a>
        <a
          className={classes.LinkIconIcon}
          href="https://www.instagram.com/happyculteur.co/"
        >
          <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
        </a>
        <a className={classes.LinkIconIcon} href="mailto:hello@happyculteur.co">
          <FontAwesomeIcon icon="envelope" size="2x" />
        </a>
      </div>
    </div>
  );
};

export default Footer;

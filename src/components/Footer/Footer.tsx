import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
  Footer: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px",
    boxShadow: `
    -1px -2px 4px -1px rgba(0,0,0,0.2),
    -1px -4px 5px -1px rgba(0,0,0,0.14),
    -1px -1px 10px -1px rgba(0,0,0,0.12)
    `,
    gridArea: "Footer",
    zIndex: 2
  },
  Link: {
    "&:hover": {
      color: theme.palette.secondary.dark
    },
    color: theme.palette.primary.dark,
    textDecoration: "none"
  },
  Social: {
    alignContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    marginTop: "8px"
  }
}));

const Footer: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.Footer}>
      <div className={classes.Social}>
        <a
          className={classes.Link}
          href="https://www.facebook.com/happyculteur.co/"
        >
          <FontAwesomeIcon icon={["fab", "facebook"]} size="3x" />
        </a>
        <a className={classes.Link} href="https://twitter.com/happyculteur_">
          <FontAwesomeIcon icon={["fab", "twitter"]} size="3x" />
        </a>
        <a
          className={classes.Link}
          href="https://www.instagram.com/happyculteur.co/"
        >
          <FontAwesomeIcon icon={["fab", "instagram"]} size="3x" />
        </a>
        <a className={classes.Link} href="mailto:hello@happyculteur.co">
          <FontAwesomeIcon icon="envelope" size="3x" />
        </a>
      </div>
    </div>
  );
};

export default Footer;

import {
  Card as MuiCard,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React from "react";
import honey from "../../assests/002-honey-6.svg";

const useStyles = makeStyles(theme => ({
  actions: {
    display: "flex"
  },
  card: {
    margin: "10px",
    maxWidth: 400
  },
  expand: {
    marginLeft: "auto",
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));

const Card: React.FunctionComponent = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <MuiCard className={classes.card}>
      <CardHeader title="CARD TITLE" subheader="CARD SUBHEADER" />
      <CardMedia className={classes.media} image={honey} title="IMG TTTLE" />
      <CardContent>
        <Typography component="p">TEXT</Typography>
      </CardContent>
      <CardActions disableActionSpacing={true} className={classes.actions}>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse unmountOnExit={true} in={expanded} timeout="auto">
        <CardContent>
          <Typography paragraph={true}>Hidden Text!!</Typography>
        </CardContent>
      </Collapse>
    </MuiCard>
  );
};

export default Card;

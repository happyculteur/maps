import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { CardList } from "../../components/CardList";
import { Map } from "../../components/Map";

const useStyles = makeStyles({
  CardList: {
    borderLeft: "5px dashed yellow"
  },
  gridContainer: {
    display: "grid",
    gridTemplateAreas: `
    'Map CardList'
    `,
    gridTemplateColumns: "1.5fr 0.5fr",
    gridTemplateRows: "100%",
    height: "100%",
    width: "100%"
  }
});

const MapAndCardList: React.FunctionComponent<RouteComponentProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.gridContainer}>
      <Map />
      <CardList className={classes.CardList} />
    </div>
  );
};

export default MapAndCardList;

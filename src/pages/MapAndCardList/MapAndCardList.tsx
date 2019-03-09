import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { CardList } from "../../components/CardList";
import { Map } from "../../components/Map";
import { userCategory, userType } from "../../types";
import beekeeperData from "./beekeeperData.json";
import individualData from "./individualData.json";

const useStyles = makeStyles(theme => ({
  CardList: {
    boxShadow: "-3px 0 30px -8px #444",
    zIndex: 1
  },
  Map: {
    zIndex: 0
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
}));

const MapAndCardList: React.FunctionComponent<RouteComponentProps> = () => {
  const classes = useStyles();
  // TODO: To be handle as context with { elements[] load() }
  const load: (
    numberToLoad: number,
    elements: userType[]
  ) => Promise<userType[]> = async (elements, numberToLoad) => {
    // TODO: Proper algorithm resolution for handling infiniteScroll
    const data: userType[] = [];
    const beekeepers = beekeeperData.map(beekeeper => ({
      ...beekeeper,
      category: userCategory.beekeeper
    }));
    const individuals = individualData.map(individual => ({
      ...individual,
      category: userCategory.individual
    }));

    return data.concat(beekeepers, individuals);
  };

  return (
    <div className={classes.gridContainer}>
      <Map className={classes.Map} />
      <CardList load={load} className={classes.CardList} />
    </div>
  );
};

export default MapAndCardList;

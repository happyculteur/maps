import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { CardList } from "../../components/CardList";
import { Map } from "../../components/Map";
import { UserContextProvider } from "../../context/UserContext";
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

  return (
    <div className={classes.gridContainer}>
      <UserContextProvider>
        <Map className={classes.Map} />
        <CardList className={classes.CardList} />
      </UserContextProvider>
    </div>
  );
};

export default React.memo(MapAndCardList);

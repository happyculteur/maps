import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import "leaflet/dist/leaflet.css";
import React from "react";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../../context/UserContext";
import { IBeekeeper, IIndividual, userCategory, userType } from "../../types";
import { CardBeekeeper, CardIndividual } from "../Card/Scenes";
import { InfiniteScroll } from "../InfiniteScroll";

const useStyles = makeStyles({
  CardList: {
    alignContent: "stretch",
    alignItems: "baseline",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gridArea: "CardList",
    height: "100%",
    justifyContent: "center",
    width: "100%"
  }
});

interface ICardListOwnProps {
  className?: string;
}

const CardList: React.FunctionComponent<
  ICardListOwnProps & RouteComponentProps
> = props => {
  const classes = useStyles();
  const userContextValue = React.useContext(UserContext);

  return (
    <InfiniteScroll
      numberToLoad={3}
      load={userContextValue.load}
      elements={userContextValue.userElements}
      className={classnames(classes.CardList, props.className)}
      loaderElement={<SyncLoader />}
    >
      {(data: userType) => {
        return data.category === userCategory.individual ? (
          <CardIndividual key={data.uuid} individual={data as IIndividual} />
        ) : (
          <CardBeekeeper key={data.uuid} beekeeper={data as IBeekeeper} />
        );
      }}
    </InfiniteScroll>
  );
};

export default CardList;

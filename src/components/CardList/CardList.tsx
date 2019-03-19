import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import "leaflet/dist/leaflet.css";
import React from "react";
import { SyncLoader } from "react-spinners";
import { UserContext } from "../../context/UserContext";
import {
  IBeekeeper,
  IIndividual,
  ISpace,
  userCategory,
  userType
} from "../../types";
import { CardBeekeeper, CardIndividual, CardSpace } from "../Card/Scenes";
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
  const userRender = {
    [userCategory.individual]: (data: IIndividual) => (
      <CardIndividual key={data.uuid} individual={data} />
    ),
    [userCategory.beekeeper]: (data: IBeekeeper) => (
      <CardBeekeeper key={data.uuid} beekeeper={data} />
    ),
    [userCategory.space]: (data: ISpace) => (
      <CardSpace key={data.uuid} space={data} />
    )
  };
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
        return userRender[data.category](data as any);
      }}
    </InfiniteScroll>
  );
};

export default CardList;

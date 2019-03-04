import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import "leaflet/dist/leaflet.css";
import React from "react";
import { SyncLoader } from "react-spinners";
import { IUser } from "../../types";
import { dataSourceTransformer } from "../../utils";
import { Card } from "../Card";
import { InfiniteScroll } from "../InfiniteScroll";
import beekeeperData from "./beekeeperData.json";
import individualData from "./individualData.json";

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
  const load: (
    numberToLoad: number,
    elements: IUser[]
  ) => Promise<IUser[]> = async (numberToLoad: number) => {
    await new Promise(resolve => setTimeout(resolve, 3000));

    return data.reduce(
      (accumulator, userInfo) => {
        accumulator.push(dataSourceTransformer(userInfo));

        return accumulator;
      },
      [] as IUser[]
    );
  };

  return (
    <InfiniteScroll
      numberToLoad={30}
      load={load}
      className={classnames(classes.CardList, props.className)}
      loaderElement={<SyncLoader />}
    >
      {(user: IUser) => <Card key={user.information.uuid} user={user} />}
    </InfiniteScroll>
  );
};

export default CardList;

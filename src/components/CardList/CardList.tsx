import { makeStyles } from "@material-ui/styles";
import { RouteComponentProps } from "@reach/router";
import classnames from "classnames";
import "leaflet/dist/leaflet.css";
import React from "react";
import { SyncLoader } from "react-spinners";
import uuid from "uuid";
import { Card } from "../Card";
import { InfiniteScroll } from "../InfiniteScroll";
import data from "./fakedata.json";
import { IBeekeeper, IInformation, ISpace, ITraining, IUser } from "./types";

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
      (accumulator, current) => {
        const information: IInformation = {
          category: current.category as IInformation["category"],
          interrest:
            current["individual-insterest-in-happyculteur"] ||
            current["beekeeper-interest-in-happyculteur"],
          level: current["individual-level"] || current["beekeeper-level"],
          location: current.address as [number, number],
          name: current.name,
          uuid: uuid()
        };
        const space: ISpace | undefined = current["individual-space-has-space"]
          ? {
              description: current["individual-space-description"],
              location: current["individual-space-location"] as [
                number,
                number
              ],
              size: current["individual-space-size"],
              type: current["individual-space-type"] as ISpace["type"]
            }
          : undefined;
        const beekeeper: IBeekeeper | undefined =
          information.category === "Apiculteur"
            ? {
                installation: current["beekeeper-installation-type-wished"],
                nest: current["beekeeper-nest-number"],
                since: current["beekeeper-time"]
              }
            : undefined;
        const training: ITraining | undefined =
          information.category === "Apiculteur"
            ? {
                isBilled: current["beekeeper-is-formation-billed"],
                location: (current["beekeeper-formation-place"] ||
                  information.location) as [number, number],
                target: current["beekeeper-formation-audience"]
              }
            : undefined;

        accumulator.push({
          beekeeper,
          information,
          space,
          training
        });

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
      {(user: IUser) => <Card key={user.information.uuid} {...user} />}
    </InfiniteScroll>
  );
};

export default CardList;

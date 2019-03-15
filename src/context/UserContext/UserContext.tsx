import _ from "lodash";
import React from "react";
import {
  IBeekeeper,
  IIndividual,
  ISpace,
  userCategory,
  userType
} from "../../types";
import beekeeperData from "./beekeeperData.json";
import individualData from "./individualData.json";

export let UserContext = React.createContext({
  load: (numberToLoad: number) => Promise.resolve(),
  userElements: [] as userType[]
});

const UserContextProvider: React.FunctionComponent = props => {
  const initialData: userType[] = [];
  const [userElements, setUserElements] = React.useState(initialData);
  const load: (numberToLoad: number) => Promise<void> = async numberToLoad => {
    let diff;
    const data: userType[] = [];
    const beekeepers = beekeeperData.map(
      beekeeper =>
        ({
          ...beekeeper,
          category: userCategory.beekeeper
        } as IBeekeeper)
    );
    diff = _.differenceBy(beekeepers, userElements, "uuid");

    if (diff.length < numberToLoad) {
      let spaces = [] as ISpace[];
      const individuals = individualData.map(individual => {
        if (individual.spaces) {
          spaces = individual.spaces.map(
            space =>
              ({
                ...space,
                category: userCategory.space
              } as ISpace)
          );
        }

        return {
          ...individual,
          category: userCategory.individual
        } as IIndividual;
      });

      diff = _.differenceBy(
        [...beekeepers, ...individuals, ...spaces],
        userElements,
        "uuid"
      );
    }

    if (diff.length > 0) {
      setUserElements(data.concat(userElements, diff.slice(0, numberToLoad)));
    }
  };
  const initialValue = {
    load,
    userElements
  };

  return (
    <UserContext.Provider value={initialValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

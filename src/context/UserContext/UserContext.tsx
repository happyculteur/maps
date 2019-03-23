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
  focus: [] as number[],
  load: (numberToLoad: number) => Promise.resolve(),
  setFocus: (value: number[]) => {
    return;
  },
  userElements: [] as userType[]
});

const UserContextProvider: React.FunctionComponent = props => {
  const initialData: userType[] = [];
  const [userElements, setUserElements] = React.useState(initialData);
  const [focus, setFocusValue] = React.useState([] as number[]);
  /* TS hack */
  const setFocus = (value: number[]) => {
    setFocusValue(value);
  };
  /* TS hack */
  const load: (numberToLoad: number) => Promise<void> = async numberToLoad => {
    let diff;
    const data: userType[] = [];
    const beekeepers: IBeekeeper[] = beekeeperData.map(
      beekeeper =>
        ({
          ...beekeeper,
          category: userCategory.beekeeper,
          primary: beekeeper.firstname
        } as IBeekeeper)
    );
    diff = _.differenceBy(beekeepers, userElements, "uuid");

    if (diff.length < numberToLoad) {
      let spaces = [] as ISpace[];
      const individuals = individualData.map(individual => {
        const { spaces: spacesIndividual, ...rest } = individual;
        if (spacesIndividual) {
          spaces = spaces.concat(
            individual.spaces.map(
              space =>
                ({
                  ...space,
                  category: userCategory.space,
                  primary: space.description
                } as ISpace)
            )
          );
        }

        return {
          ...rest,
          category: userCategory.individual,
          hasSpace: !!spacesIndividual,
          primary: individual.firstname
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
    focus,
    load,
    setFocus,
    userElements
  };

  return (
    <UserContext.Provider value={initialValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

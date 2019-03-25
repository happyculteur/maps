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
      let spacesLocation = [] as Array<ISpace["location"]>;

      const individuals = individualData.map(individual => {
        const { spaces: spacesIndividual, ...rest } = individual;
        if (spacesIndividual) {
          const { _spaces, _spacesLocation } = spacesIndividual.reduce(
            (accumulator, space) => {
              accumulator._spaces.push({
                ...space,
                category: userCategory.space,
                owner: {
                  location: individual.location,
                  name: individual.firstname,
                  uuid: individual.uuid
                },
                primary: space.description
              } as ISpace);
              accumulator._spacesLocation.push(space.location);

              return accumulator;
            },
            {
              _spaces: [] as ISpace[],
              _spacesLocation: [] as Array<ISpace["location"]>
            }
          );

          spaces = spaces.concat(_spaces);
          spacesLocation = _spacesLocation;
        }

        return {
          ...rest,
          category: userCategory.individual,
          hasSpace: !!individual.spaces.length,
          primary: individual.firstname,
          spaces: spacesLocation
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

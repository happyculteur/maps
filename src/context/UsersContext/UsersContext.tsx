import _ from "lodash";
import React, { useEffect, useState } from "react";
import {
  IBeekeeper,
  IBeekeeperRAW,
  IIndividual,
  IIndividualRAW,
  ISpace,
  ISpaceRAW,
  userCategory,
  userType
} from "../../types";

export let UsersContext = React.createContext({
  focus: [] as number[],
  load: (numberToLoad: number) => Promise.resolve(),
  setFilter: (value: {
    beekeeper: boolean;
    individual: boolean;
    space: boolean;
  }) => {
    return;
  },
  setFocus: (value: number[]) => {
    return;
  },
  userElements: [] as userType[]
});

const UsersContextProvider: React.FunctionComponent = props => {
  const initialData: userType[] = [];
  const [userElements, setUserElements] = React.useState(initialData);
  const [focus, setFocusValue] = React.useState([] as number[]);
  const [filterElements, setFilterElementsValue] = useState({
    beekeeper: true,
    individual: true,
    space: true
  });

  useEffect(() => {
    setUserElements(
      userElements.map(user => ({
        ...user,
        isVisible: filterElements[userCategory[user.category]]
      }))
    );
  }, [filterElements]);

  /* TS hack */
  const setFocus: (value: number[]) => void = value => {
    setFocusValue(value);
  };
  const setFilter: (value: {
    beekeeper: boolean;
    individual: boolean;
    space: boolean;
  }) => void = value => {
    setFilterElementsValue(value);
  };
  /* TS hack */

  const loadBeekeeper: (
    url: string,
    filter: boolean
  ) => Promise<IBeekeeper[]> = async (url, filter) => {
    let beekeepers: IBeekeeper[];
    const beekeeperData = await (await fetch(url)).json();

    beekeepers = beekeeperData.map(
      (beekeeper: IBeekeeperRAW) =>
        ({
          ...beekeeper,
          category: userCategory.beekeeper,
          isVisible: filter,
          primary: beekeeper.firstname
        } as IBeekeeper)
    );

    return beekeepers;
  };

  const loadIndividualAndSpace: (
    url: string,
    filter: { individual: boolean; space: boolean }
  ) => Promise<{ individuals: IIndividual[]; spaces: ISpace[] }> = async (
    url,
    filter
  ) => {
    let spaces = [] as ISpace[];
    let spacesLocation = [] as Array<ISpace["location"]>;
    let individuals: IIndividual[];
    const individualData = await (await fetch(url)).json();

    individuals = individualData.map((individual: IIndividualRAW) => {
      const { spaces: spacesIndividual, ...rest } = individual;

      if (spacesIndividual) {
        const { _spaces, _spacesLocation } = spacesIndividual.reduce(
          (accumulator, space: ISpaceRAW) => {
            accumulator._spaces.push({
              ...space,
              category: userCategory.space,
              isVisible: filter.space,
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
        isVisible: filter.individual,
        primary: individual.firstname,
        spaces: spacesLocation
      } as IIndividual;
    });

    return {
      individuals,
      spaces
    };
  };

  const load: (numberToLoad: number) => Promise<void> = async numberToLoad => {
    let diff: Array<IBeekeeper | IIndividual | ISpace> = [];
    const data: userType[] = [];
    const beekeeperURL = process.env.REACT_APP_HAPPYCULTEUR_DATA_BEEKEPER || "";
    const individualURL =
      process.env.REACT_APP_HAPPYCULTEUR_DATA_INDIVIDUAL || "";

    const beekeepers = await loadBeekeeper(
      beekeeperURL === ""
        ? `${process.env.PUBLIC_URL}/beekeeperData.json`
        : beekeeperURL,
      filterElements.beekeeper
    );

    const { individuals, spaces } = await loadIndividualAndSpace(
      individualURL === ""
        ? `${process.env.PUBLIC_URL}/individualData.json`
        : individualURL,
      { individual: filterElements.individual, space: filterElements.space }
    );

    diff = _.differenceBy(
      [...beekeepers, ...individuals, ...spaces],
      userElements,
      "uuid"
    );

    if (diff.length > 0) {
      setUserElements(data.concat(userElements, diff.slice(0, numberToLoad)));
    }
  };

  const initialValue = {
    focus,
    load,
    setFilter,
    setFocus,
    userElements
  };

  return (
    <UsersContext.Provider value={initialValue}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersContextProvider;

import { v4 } from "uuid";
import { IUserCategorie, IUserDetails } from "./types";

export const format: (data: IUserDetails[]) => IUserCategorie[] = data => {
  return data.reduce(
    (accumulator: IUserCategorie[], user: IUserDetails) => {
      const { address, category, name, surname } = user;
      const index = Number(category === "Apiculteur");
      return accumulator[index].data.push({
        address,
        name,
        surname,
        uuid: v4()
      });
    },
    [
      {
        data: [],
        name: "Particulier",
        uuid: v4()
      },
      {
        data: [],
        name: "Apiculteur",
        uuid: v4()
      }
    ]
  );
};

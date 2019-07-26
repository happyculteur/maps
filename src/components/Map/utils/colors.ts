import { defaultTheme } from "../../../configuration/materialUi";
import { userCategory } from "../../../types";
import { IColors } from "../types";

const colors: IColors = {
  [userCategory.individual]: defaultTheme.palette.primary.main,
  [userCategory.beekeeper]: defaultTheme.palette.secondary.light,
  [userCategory.space]: defaultTheme.palette.secondary.dark
};

export default colors;

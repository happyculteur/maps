import { shallowWithTheme } from "../../helper/test";
import AppBar from "./AppBar";

describe("AppBar component", () => {
  let minProps: object;

  beforeEach(() => {
    minProps = {
      classes: {},
      t: (sentence: string) => sentence
    };
  });

  it("renders correctly", () => {
    const wrapper = shallowWithTheme(AppBar, minProps);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});

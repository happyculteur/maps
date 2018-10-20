import { shallow } from "enzyme";
import * as React from "react";
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
    const wrapper = shallow(<AppBar {...minProps} />);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});

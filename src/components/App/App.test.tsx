import { shallow } from "enzyme";
import * as React from "react";
import App from "./App";

it("should renders without crashing", () => {
  const wrapper = shallow(<App />);

  expect(wrapper.debug()).toMatchSnapshot();
});

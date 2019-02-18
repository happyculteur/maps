import { shallow } from "enzyme";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { AppBar, useStyles } from "./AppBar";

jest.mock("@material-ui/styles");
jest.mock("react-i18next");

describe("AppBar component", () => {
  describe("on shallow rendering", () => {
    it("should renders without crashing", () => {
      const wrapper = shallow(<AppBar />);

      expect(wrapper.debug()).toMatchSnapshot();
    });

    describe("should rely on hook", () => {
      it("useStyles", () => {
        shallow(<AppBar />);
        expect(useStyles).toHaveBeenCalledTimes(2);
      });
      it("useTranlation", () => {
        shallow(<AppBar />);
        expect(useTranslation).toHaveBeenCalledTimes(3);
      });
    });
  });
});

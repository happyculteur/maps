import { ThemeProvider } from "@material-ui/styles";
import { shallow, ShallowWrapper } from "enzyme";
import * as React from "react";
import { defaultTheme } from "../../configuration/materialUi";

const shallowWithTheme: (
  Component: React.SFC,
  minProps: object
) => ShallowWrapper = (Component, minProps) => {
  const outer = shallow(
    <ThemeProvider theme={defaultTheme}>
      <Component {...minProps} />
    </ThemeProvider>
  );
  const Children = outer.props().children;
  const wrapper = shallow(<Children />);

  return wrapper;
};

export default shallowWithTheme;

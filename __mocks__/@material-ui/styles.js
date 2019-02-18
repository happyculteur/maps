const theme = require("../../src/configuration/materialUi");
const styles = jest.requireActual("@material-ui/styles");

const makeStyles = (fn) => {
  return jest
    .fn()
    .mockReturnValue(
      fn.bind(fn, theme.defaultTheme)
    );
};

module.exports = {
  ...styles,
  makeStyles
};

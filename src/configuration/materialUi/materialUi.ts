import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      contrastText: "#000",
      dark: "#777",
      light: "#ffffff",
      main: "#fafafa"
    },
    secondary: {
      contrastText: "#000",
      dark: "#ff9900",
      light: "#ffff54",
      main: "#f8cf0b"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default defaultTheme;

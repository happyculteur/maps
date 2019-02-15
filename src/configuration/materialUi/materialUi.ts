import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      contrastText: "#000",
      dark: "#c7c7c7",
      light: "#ffffff",
      main: "#fafafa"
    },
    secondary: {
      contrastText: "#000",
      dark: "#c19e00",
      light: "#ffff54",
      main: "#f8cf0b"
    }
  }
});

export default defaultTheme;

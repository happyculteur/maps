import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
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
  },
  typography: {
    useNextVariants: true
  }
});

export default defaultTheme;

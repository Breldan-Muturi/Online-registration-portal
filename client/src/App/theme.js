import { createTheme } from "@material-ui/core";
const kipGreen = "#4EA375";
const kipLightGreen = "#50BF80";
const darkText = "rgba(0, 0, 0, 0.87)";

export const theme = createTheme({
  palette: {
    common: {
      green: `${kipGreen}`,
      lightGreen: `${kipLightGreen}`,
    },
    primary: {
      light: `${kipLightGreen}`,
      main: `${kipGreen}`,
      darkText: `${darkText}`,
    },
  },
  typography: {
    fontWeightMenu: 600,
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 400,
    },
  },
});

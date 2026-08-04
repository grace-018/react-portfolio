import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#65451F",
    },
    secondary: {
      main: "#C8AE7D",
    },
    accent: {
      main: "#765827",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F9F5E7",
      alt: "#F1E6C8",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Didact Gothic", Arial, sans-serif',
  },
});

export default theme;

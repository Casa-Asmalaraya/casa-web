import { createTheme } from "@mui/material";
import "@fontsource-variable/manrope/index.css";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#222222",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorInherit: {
          backgroundColor: "#fff",
        },
      },
      defaultProps: {
        color: "inherit",
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            borderRadius: 30,
          }),
      },
    },
    MuiDialogContent: {
      styleOverrides: { root: ({ theme }) => theme.unstable_sx({ paddingTop: `${theme.spacing(2)} !important` }) },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: ['"Manrope Variable"', "sans-serif"].join(","),
  },
});

export default defaultTheme;

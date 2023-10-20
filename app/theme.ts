import { createTheme } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3B60E4",
    },
    secondary: {
      main: "#3B60E4",
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
    fontFamily: ['"Manrope"', "sans-serif"].join(","),
  },
});

export default defaultTheme;

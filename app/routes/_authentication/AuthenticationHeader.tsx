import { Box, Typography } from "@mui/material";
import { useLocation } from "@remix-run/react";
import logo from "~/assets/logo-text.png";

export default function AuthenticationHeader() {
  const location = useLocation();

  return (
    <>
      <Box sx={{ marginX: "auto" }}>
        <img width={"150px"} src={logo} />
      </Box>
      <Typography component="h1" variant="h5" textAlign="center">
        {location.pathname === "/login" ? "Masuk" : "Daftar"}
      </Typography>
    </>
  );
}

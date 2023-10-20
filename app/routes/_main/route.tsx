import { Container, Toolbar, Box } from "@mui/material";
import { Outlet } from "@remix-run/react";
import MainFooter from "./MainFooter";
import MainAppBar from "./MainAppBar";

export default function Layout() {
  return (
    <Box flex={1}>
      <MainAppBar />
      <Container component={"main"} maxWidth={"lg"} sx={{ p: 3, minHeight: "100vh" }}>
        <Toolbar />
        <Outlet />
      </Container>
      <MainFooter />
    </Box>
  );
}

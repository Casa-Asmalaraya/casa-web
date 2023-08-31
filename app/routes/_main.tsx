import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Container, Toolbar, Typography, Button, AppBar as MuiAppBar, Stack, Box, Link, Paper } from "@mui/material";
import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <Box flex={1}>
      <AppBar />
      <Container component={"main"} maxWidth={"lg"} sx={{ p: 3, minHeight: "100vh" }}>
        <Toolbar />
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

function AppBar() {
  return (
    <MuiAppBar position="fixed" variant="outlined" elevation={0} component={"nav"}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flex: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LocalPlace
          </Typography>
          <Stack gap={"8px"} direction={"row"} mr={"32px"}>
            <Button>Jadi Patner LocalPlace</Button>
            <Button>Cek Booking</Button>
          </Stack>
          <Stack gap={"8px"} direction={"row"}>
            <Button variant="outlined">Masuk</Button>
            <Button variant="contained" disableElevation>
              Daftar
            </Button>
          </Stack>
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
}

function Footer() {
  return (
    <Paper
      variant="outlined"
      component={"footer"}
      square
      sx={{ padding: "16px", borderLeft: "none", borderRight: "none", borderBottom: "none" }}
    >
      <Container maxWidth="lg">
        <Stack gap={"32px"}>
          <Stack gap={"32px"} direction={"row"}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                flex: 1,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LocalPlace
            </Typography>
            <Stack flex={1} gap={"8px"}>
              <Typography variant="h6">About Us</Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc viverra nibh a ultricies fringilla.{" "}
              </Typography>
            </Stack>
            <Stack flex={1} gap={"8px"}>
              <Typography variant="h6">Contact Us</Typography>
              <Typography variant="body2">123 Main Street, Anytown</Typography>
              <Typography variant="body2">Email: info@example.com</Typography>
              <Typography variant="body2">Phone: +1 234 567 8901</Typography>
            </Stack>
            <Stack flex={1} gap={"8px"}>
              <Typography variant="h6">Follow Us</Typography>
              <Link
                href="https://www.facebook.com/"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <Facebook /> localplace
              </Link>
              <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <Instagram /> localplace
              </Link>
              <Link
                href="https://www.twitter.com/"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <Twitter /> localplace
              </Link>
            </Stack>
          </Stack>
          <Typography align={"center"}>Copyright © LocalPlace {new Date().getFullYear()}</Typography>
        </Stack>
      </Container>
    </Paper>
  );
}

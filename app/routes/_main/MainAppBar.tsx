import { AppBar, Container, Toolbar, Stack, Button, Box } from "@mui/material";
import logo from "~/assets/logo-text.png";

export default function MainAppBar() {
  return (
    <AppBar position="fixed" variant="outlined" elevation={0} component={"nav"}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            flex="1"
            color="inherit"
            sx={{
              textDecoration: "none",
            }}
          >
            <img width={"100px"} src={logo} />
          </Box>
          <Stack gap={"8px"} direction={"row"} mr={"32px"}>
            <Button>Jadi Patner LokalPlace</Button>
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
    </AppBar>
  );
}

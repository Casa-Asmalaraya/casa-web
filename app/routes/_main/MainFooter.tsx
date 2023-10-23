import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Paper, Container, Stack, Typography, Link, Box } from "@mui/material";
import logo from "~/assets/logo-text.png";

export default function MainFooter() {
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
                <Facebook /> LokalPlace
              </Link>
              <Link
                href="https://www.instagram.com/"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <Instagram /> LokalPlace
              </Link>
              <Link
                href="https://www.twitter.com/"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <Twitter /> LokalPlace
              </Link>
            </Stack>
          </Stack>
          <Typography align={"center"}>Copyright © LokalPlace {new Date().getFullYear()}</Typography>
        </Stack>
      </Container>
    </Paper>
  );
}

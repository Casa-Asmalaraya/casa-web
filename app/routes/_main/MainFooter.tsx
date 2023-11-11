import { Instagram } from "@mui/icons-material";
import { Paper, Container, Stack, Typography, Link, Box } from "@mui/material";
import logo from "~/assets/logo-text.png";
import TikTokIcon from "~/components/TikTokIcon";

export default function MainFooter() {
  return (
    <Paper
      variant="outlined"
      component={"footer"}
      square
      sx={{ py: "32px", px: "16px", borderLeft: "none", borderRight: "none", borderBottom: "none" }}
    >
      <Container maxWidth="lg">
        <Stack gap={"32px"}>
          <Stack gap={"32px"} direction={{ xs: "column", md: "row" }}>
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
              <Typography variant="body2">
                Institut Teknologi Indonesia, Jl. Raya Puspitek, Setu, Kec. Serpong, Kota Tangerang Selatan, Banten
                15314
              </Typography>
              <Typography variant="body2">Email: casa.asmalaraya@gmail.com</Typography>
              <Typography variant="body2">Phone: +1 234 567 8901</Typography>
            </Stack>
            <Stack flex={1} gap={"8px"}>
              <Typography variant="h6">Follow Us</Typography>
              <Link
                href="https://www.tiktok.com/@lokalplace.com"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <TikTokIcon /> @lokalplace.com
              </Link>
              <Link
                href="https://www.instagram.com/casa.asmalaraya"
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none" }}
              >
                <Instagram /> casa.asmalaraya
              </Link>
            </Stack>
          </Stack>
          <Typography align={"center"}>Copyright © lokalplace {new Date().getFullYear()}</Typography>
        </Stack>
      </Container>
    </Paper>
  );
}

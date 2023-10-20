import { Container } from "@mui/material";
import { Outlet } from "@remix-run/react";
import AuthenticationHeader from "./AuthenticationHeader";
import { V2_MetaArgs } from "@remix-run/node";

export function meta({ location }: V2_MetaArgs) {
  return [{ title: `${location.pathname === "/login" ? "Masuk" : "Daftar"} - LokalPlace` }];
}

export default function Layout() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        minHeight: "100vh",
        padding: "64px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <AuthenticationHeader />
      <Outlet />
    </Container>
  );
}

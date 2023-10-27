import { Container, Toolbar, Box } from "@mui/material";
import { Outlet, useLoaderData } from "@remix-run/react";
import MainFooter from "./MainFooter";
import MainAppBar from "./MainAppBar";
import { loaderServer } from "./loader.server";
import { LoaderFunctionArgs } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InProfileDto } from "~/dtos/profile/in-profile-dto";
import { AppContextProvider } from "~/contexts/AppContext";

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export default function Layout() {
  const loaderData = useLoaderData<DataResponse<InProfileDto> | null>();
  return (
    <AppContextProvider
      value={{
        profile: loaderData?.data,
      }}
    >
      <Box flex={1}>
        <MainAppBar />
        <Container
          component={"main"}
          maxWidth={"lg"}
          sx={{ p: 3, display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <Toolbar />
          <Outlet />
        </Container>
        <MainFooter />
      </Box>
    </AppContextProvider>
  );
}

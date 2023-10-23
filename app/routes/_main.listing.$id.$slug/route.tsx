import { Box, Stack } from "@mui/material";
import ListingAbout from "./ListingAbout";
import ListingCoverImage from "./ListingCoverImage";
import ListingFacility from "./ListingFacility";
import ListingPhotos from "./ListingPhotos";
import ListingRule from "./ListingRule";
import ListingSide from "./ListingSide";
import ListingTitle from "./ListingTitle";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { LoaderFunctionArgs } from "@remix-run/node";
import { loaderServer } from "./loader.server";

export const meta = () => {
  return [{ title: "Cari, Datang, Healing - LokalPlace" }];
};

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export default function Page() {
  return (
    <Stack spacing={"32px"}>
      <ListingTitle />
      <ListingCoverImage />
      <Stack spacing={"32px"} direction={"row"}>
        <Stack overflow={"hidden"} flex={4} spacing={"32px"}>
          <ListingAbout />
          <ListingFacility />
          <ListingRule />
          <ListingPhotos />
        </Stack>
        <Box flex={2}>
          <ListingSide />
        </Box>
      </Stack>
    </Stack>
  );
}

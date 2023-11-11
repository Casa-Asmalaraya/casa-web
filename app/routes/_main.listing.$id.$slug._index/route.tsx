import { Box, Stack } from "@mui/material";
import ListingAbout from "./ListingAbout";
import ListingCoverImage from "./ListingCoverImage";
import ListingFacility from "./ListingFacility";
import ListingPhotos from "./ListingPhotos";
import ListingRule from "./ListingRule";
import ListingSide from "./ListingSide";
import ListingTitle from "./ListingTitle";
import { LoaderFunctionArgs, MetaArgs } from "@remix-run/node";
import { loaderServer } from "./loader.server";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export const meta = (args: MetaArgs) => {
  const loaderData = args.data as DataResponse<InListingDto> | null;
  const data = loaderData?.data;

  return [{ title: `${data?.name} - lokalplace` }];
};

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export default function Page() {
  return (
    <Stack spacing={"32px"}>
      <ListingTitle />
      <ListingCoverImage />
      <Stack spacing={"32px"} direction={"row"} display={{ xs: "none", md: "flex" }}>
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
      <Stack spacing={"32px"} display={{ md: "none" }}>
        <ListingSide />
        <ListingAbout />
        <ListingFacility />
        <ListingRule />
        <ListingPhotos />
      </Stack>
    </Stack>
  );
}

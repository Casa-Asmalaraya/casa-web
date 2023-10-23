import { Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingTitle() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  const location = `${data?.district?.name}, ${data?.regency?.name}, ${data?.province?.name}`.toLowerCase();

  return (
    <Stack>
      <Typography variant="h5" component="h1">
        {data?.name}
      </Typography>
      <Typography textTransform={"capitalize"}>{location}</Typography>
    </Stack>
  );
}

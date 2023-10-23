import { Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { MuiMarkdown, getOverrides } from "mui-markdown";

export default function ListingAbout() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  const description = data?.description ?? "Tidak ada detail";

  return (
    <Stack spacing={"16px"}>
      <Typography variant="h6">Tentang Home Stay Ini</Typography>
      <MuiMarkdown overrides={{ ...getOverrides }} children={description} />
    </Stack>
  );
}

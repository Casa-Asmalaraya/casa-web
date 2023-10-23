import { Box } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingCoverImage() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  return (
    <Box
      width={"100%"}
      height={"600px"}
      component={"img"}
      borderRadius={"16px"}
      sx={{ objectFit: "cover" }}
      src={data?.coverPhoto?.url}
    ></Box>
  );
}

import { Box, Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export function BookingListingDetail() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  return (
    <Stack direction={"row"} spacing={"16px"} alignItems={"center"}>
      <Box
        width={"75px"}
        height={"75px"}
        component={"img"}
        borderRadius={"16px"}
        sx={{ objectFit: "cover" }}
        src={data?.coverPhoto?.url}
      ></Box>
      <Stack>
        <Typography variant="h6" fontWeight={"500"}>
          {data?.name}
        </Typography>
        <Typography variant="body2">Jalan Pandawa No.88A, Kelapa Dua, Kabupaten Tangerang, Banten</Typography>
      </Stack>
    </Stack>
  );
}

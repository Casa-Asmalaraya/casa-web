import { Stack, Typography, Box } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingPhotos() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  return (
    <Stack spacing={"16px"}>
      <Typography variant="h6">Foto</Typography>
      <Box width={"100%"} overflow={"auto"}>
        <Stack direction={"row"} spacing={"16px"}>
          {data?.photos?.map((e) => (
            <Box
              width={300}
              height={225}
              component={"img"}
              borderRadius={"16px"}
              sx={{ objectFit: "cover" }}
              src={e.url}
            ></Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingFacility() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  if (data?.listingFacilities?.length === 0) {
    return (
      <Stack spacing={"16px"}>
        <Typography variant="h6">Fasilitas</Typography>
        <Typography>Tidak ada fasilitas dicantumkan.</Typography>
      </Stack>
    );
  }

  return (
    <Stack>
      <Typography variant="h6">Fasilitas</Typography>
      <List>
        {data?.listingFacilities?.map((e) => (
          <ListItem key={e.id} disableGutters>
            <ListItemText primary={e.name} secondary={e.description} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

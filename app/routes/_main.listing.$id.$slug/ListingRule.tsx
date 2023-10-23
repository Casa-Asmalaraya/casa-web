import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingRule() {
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  if (data?.listingFacilities?.length === 0) {
    return (
      <Stack spacing={"16px"}>
        <Typography variant="h6">Peraturan</Typography>
        <Typography>Tidak ada peraturan dicantumkan.</Typography>
      </Stack>
    );
  }

  return (
    <Stack>
      <Typography variant="h6">Peraturan</Typography>
      <List>
        {data?.listingRules?.map((e) => (
          <ListItem key={e.id} disableGutters>
            <ListItemText primary={e.name} secondary={e.description} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

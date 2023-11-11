import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { Link, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";

export function BookingListingDetail() {
  const loaderData = useLoaderData<DataResponse<InBookingDto> | null>();
  const data = loaderData?.data;

  const location =
    `${data?.listing?.address}, ${data?.listing?.district?.name}, ${data?.listing?.regency?.name}, ${data?.listing?.province?.name}`.toLowerCase();

  const lat = data?.listing?.lat;
  const long = data?.listing?.long;
  const googleMapLink = lat && long ? `https://www.google.com/maps?q=${lat},${long}` : null;

  return (
    <Paper variant="outlined" sx={{ p: "16px", borderRadius: "16px" }}>
      <Typography variant="h6">Detail Listing</Typography>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText primary="Nama Listing" secondary={data?.listing?.name} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Alamat Listing" secondary={location} />
        </ListItem>
        {googleMapLink && (
          <ListItem disableGutters>
            <ListItemText
              primary="Link Google Maps"
              secondary={
                <Link href={googleMapLink!} target="_blank">
                  Buka Google Maps
                </Link>
              }
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

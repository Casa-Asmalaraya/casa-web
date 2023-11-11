import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";

export function BookingDetail() {
  const loaderData = useLoaderData<DataResponse<InBookingDto> | null>();
  const data = loaderData?.data;

  return (
    <Paper variant="outlined" sx={{ p: "16px", borderRadius: "16px" }}>
      <Typography variant="h6">Detail Booking</Typography>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText
            primary="Booking Dari"
            secondary={DateTime.fromMillis(data?.fromDate!).toFormat("cccc, dd LLL yyyy")}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primary="Booking Sampai"
            secondary={DateTime.fromMillis(data?.toDate!).toFormat("cccc, dd LLL yyyy")}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Status Booking" secondary={data?.bookingStatus} />
        </ListItem>
      </List>
    </Paper>
  );
}

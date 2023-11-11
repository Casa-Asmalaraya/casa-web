import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";

export function BookingGuest() {
  const loaderData = useLoaderData<DataResponse<InBookingDto> | null>();
  const data = loaderData?.data;

  return (
    <Paper variant="outlined" sx={{ p: "16px", borderRadius: "16px" }}>
      <Typography variant="h6">Jumlah Tamu</Typography>
      <List disablePadding>
        {data?.guests?.map((e) => (
          <ListItem key={e.type} disableGutters>
            <ListItemText primary={e.type} secondary={e.count} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

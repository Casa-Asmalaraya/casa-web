import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { Paper, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";

export function BookingHeader() {
  const loaderData = useLoaderData<DataResponse<InBookingDto> | null>();
  const data = loaderData?.data;

  return (
    <Paper variant="outlined" sx={{ p: "16px", borderRadius: "16px" }}>
      <Typography variant="h6" fontWeight={"500"}>
        {data?.listing?.name}
      </Typography>
      <Typography>Booking ID: {data?.id}</Typography>
    </Paper>
  );
}

import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { Button, List, ListItem, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { useNumericFormat } from "react-number-format";

export function BookingPaymentDetail() {
  const loaderData = useLoaderData<DataResponse<InBookingDto> | null>();
  const numbericFormat = useNumericFormat({ thousandSeparator: true });

  const data = loaderData?.data;

  return (
    <Paper variant="outlined" sx={{ p: "16px", borderRadius: "16px" }}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Typography variant="h6">Detail Pembayaran</Typography>
        {!data?.payment?.paidAt && (
          <Button
            variant="contained"
            disableElevation
            onClick={() => window.open(data?.payment?.paymentLink, "_blank")}
          >
            Bayar Sekarang
          </Button>
        )}
      </Stack>
      <List disablePadding>
        <ListItem disableGutters>
          <ListItemText
            primary="Total Pembayaran"
            secondary={numbericFormat.format!((data?.totalPrice ?? 0).toString())}
          />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText primary="Status Pembayaran" secondary={data?.payment?.paidAt ? "Paid" : "Unpaid"} />
        </ListItem>
        <ListItem disableGutters>
          <ListItemText
            primary="Expired Pada"
            secondary={DateTime.fromMillis(data?.payment?.expiredAt!).toFormat("cccc, dd LLL yyyy hh:mm:ss a")}
          />
        </ListItem>
      </List>
    </Paper>
  );
}

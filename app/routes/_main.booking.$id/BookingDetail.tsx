import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { DateTime } from "luxon";
import { useNumericFormat } from "react-number-format";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { BookingListingDetail } from "./BookingListingDetail";

export function BookingDetail({
  fromDate,
  toDate,
  onSubmit,
}: {
  fromDate: DateTime;
  toDate: DateTime | null;
  onSubmit: () => void;
}) {
  const numericFormat = useNumericFormat({ thousandSeparator: true });
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  let totalDay = 1;
  if (toDate) {
    totalDay = toDate.diff(fromDate, "days").days;
  }

  return (
    <Paper variant="outlined" sx={{ padding: "16px", borderRadius: "16px" }}>
      <Stack spacing={"16px"}>
        <Stack spacing={"4px"}>
          <Typography variant="h6">Detail Harga</Typography>
          <Stack>
            <Typography variant="body2">Rp {numericFormat.format!((data?.price ?? 0).toString())}/Malam</Typography>
            <Typography variant="body2">{numericFormat.format!(totalDay.toString())} Malam</Typography>
          </Stack>
          <Typography variant="body1" fontWeight={"500"}>
            Rp {numericFormat.format!(((data?.price ?? 0) * totalDay).toString())}
          </Typography>
        </Stack>
        <Button variant="contained" disableElevation sx={{ width: "100%" }} onClick={onSubmit}>
          Booking Sekarang
        </Button>
      </Stack>
    </Paper>
  );
}

import { Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";

export function BookingDate({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: {
  fromDate: DateTime;
  toDate: DateTime | null;
  setFromDate: (value: DateTime) => void;
  setToDate: (value: DateTime | null) => void;
}) {
  return (
    <Stack spacing="16px">
      <Typography variant="h6">Tanggal Booking</Typography>
      <Stack spacing="16px" direction={"row"}>
        <DatePicker
          sx={{ flex: 1 }}
          label="Tanggal Check-in"
          value={fromDate}
          minDate={DateTime.local().startOf("day")}
          onChange={(value) => {
            setFromDate(value!);
            setToDate(null);
          }}
        />
        <DatePicker
          sx={{ flex: 1 }}
          label="Tanggal Check-out"
          value={toDate}
          minDate={fromDate.plus({ days: 1 })}
          onChange={(value) => setToDate(value)}
        />
      </Stack>
    </Stack>
  );
}

import { Paper, Stack, Typography, Button } from "@mui/material";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useNumericFormat } from "react-number-format";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingSide() {
  const navigate = useNavigate();
  const numbericFormat = useNumericFormat({ thousandSeparator: true });
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  const location = `${data?.district?.name}, ${data?.regency?.name}, ${data?.province?.name}`.toLowerCase();

  return (
    <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
      <Stack p={"16px"} spacing={"16px"}>
        <Typography variant="h6">Rp {numbericFormat.format!((data?.price ?? 0).toString())}/Malam</Typography>
        <iframe
          width="100%"
          height="300"
          src="https://www.openstreetmap.org/export/embed.html?bbox=106.6275715827942%2C-6.176758294851963%2C106.64323568344118%2C-6.1671903114226945&amp;layer=mapnik"
          style={{ border: "none", borderRadius: "16px" }}
        ></iframe>
        <Typography variant="body2" textTransform={"capitalize"}>
          {data?.address}, {location}
        </Typography>
        <Stack spacing={"8px"}>
          <Button variant="contained" disableElevation onClick={() => navigate(`/booking/${data?.id}`)}>
            Booking Sekarang
          </Button>
          <Typography variant="caption">Minimum 1 dan maksimum 10 hari tinggal</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

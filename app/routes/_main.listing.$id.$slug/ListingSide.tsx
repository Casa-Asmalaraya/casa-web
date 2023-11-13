import { Paper, Stack, Typography, Button, Box } from "@mui/material";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { useNumericFormat } from "react-number-format";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";

export default function ListingSide() {
  const navigate = useNavigate();
  const numbericFormat = useNumericFormat({ thousandSeparator: true });
  const loaderData = useLoaderData<DataResponse<InListingDto> | null>();
  const data = loaderData?.data;

  const location =
    `${data?.address}, ${data?.district?.name}, ${data?.regency?.name}, ${data?.province?.name}`.toLowerCase();

  const lat = data?.lat;
  const long = data?.long;

  const osmEmbedLink =
    lat && long
      ? "https://www.openstreetmap.org/export/embed.html?bbox=" +
        `${long - 0.01},${lat - 0.01},${long + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${long}`
      : null;

  return (
    <Paper variant="outlined" sx={{ borderRadius: "16px" }}>
      <Stack p={"16px"} spacing={"16px"}>
        <Typography variant="h6">Rp {numbericFormat.format!((data?.price ?? 0).toString())}/Malam</Typography>
        {osmEmbedLink && (
          <iframe
            width="100%"
            height="300"
            src={osmEmbedLink}
            style={{ border: "none", borderRadius: "16px" }}
          ></iframe>
        )}
        <Typography variant="body2" textTransform={"capitalize"}>
          {location}
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

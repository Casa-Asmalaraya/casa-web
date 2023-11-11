import { LoaderFunctionArgs, MetaArgs } from "@remix-run/node";
import { loaderServer } from "./loader.server";
import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { Alert, Stack } from "@mui/material";
import { useLoaderData } from "@remix-run/react";
import { BookingHeader } from "./BookingHeader";
import { BookingDetail } from "./BookingDetail";
import { BookingPaymentDetail } from "./BookingPaymentDetail";
import { BookingGuest } from "./BookingGuest";
import { BookingListingDetail } from "./BookingListingDetail";

export function meta(args: MetaArgs) {
  const loaderData = args.data as DataResponse<InBookingDto> | null;
  const data = loaderData?.data;

  return [{ title: `Booking ${data?.id} - lokalplace` }];
}

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export default function Page() {
  const loaderData = useLoaderData<DataResponse<InBookingDto> | null>();
  const data = loaderData?.data;

  return (
    <Stack spacing={"16px"}>
      {data?.payment?.paymentStatus != "Paid" && (
        <Alert severity="warning" sx={{ borderRadius: "16px" }}>
          Pembayaran belum dilakukan
        </Alert>
      )}
      <BookingHeader />
      <BookingDetail />
      <BookingPaymentDetail />
      <BookingListingDetail />
      <BookingGuest />
    </Stack>
  );
}

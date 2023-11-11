import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { BookingGuest } from "./BookingGuest";
import { BookingDate } from "./BookingDate";
import { BookingDetail } from "./BookingDetail";
import { MetaArgs, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { loaderServer } from "./loader.server";
import { useActionData, useSubmit } from "@remix-run/react";
import { actionServer } from "./action.server";
import { useClientMessage } from "~/hooks/useClientMessage";

export const meta = (args: MetaArgs) => {
  const loaderData = args.data as DataResponse<InListingDto> | null;
  const data = loaderData?.data;

  return [{ title: `Booking ${data?.name} - lokalplace` }];
};

export async function loader(args: LoaderFunctionArgs) {
  return loaderServer(args);
}

export async function action(args: ActionFunctionArgs) {
  return actionServer(args);
}

export default function Page() {
  const submit = useSubmit();
  const actionData = useActionData();
  const clientMessage = useClientMessage();

  const [fromDate, setFromDate] = useState(DateTime.local().startOf("day"));
  const [toDate, setToDate] = useState<DateTime | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  useEffect(() => {
    clientMessage.handle(actionData);
  }, [actionData]);

  function onSubmit() {
    const formData = new FormData();
    formData.append("fromDate", fromDate.toUTC().toMillis().toString());
    formData.append("toDate", toDate!.toUTC().toMillis().toString());
    formData.append("adults", adults.toString());
    formData.append("children", children.toString());
    formData.append("infants", infants.toString());

    submit(formData, { method: "POST" });
  }

  return (
    <Stack direction={"row"} spacing={"32px"}>
      <Stack flex={3} spacing="32px">
        <BookingDate fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
        <BookingGuest
          adults={adults}
          setAdults={setAdults}
          children={children}
          setChildren={setChildren}
          infants={infants}
          setInfants={setInfants}
        />
      </Stack>
      <Box flex={2}>
        <BookingDetail fromDate={fromDate} toDate={toDate} onSubmit={onSubmit} />
      </Box>
    </Stack>
  );
}

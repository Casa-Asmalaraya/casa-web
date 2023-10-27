import { LoaderFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import { BookingService } from "~/services/booking-service";
import { getSession } from "~/sessions";

export async function loaderServer({ request }: LoaderFunctionArgs) {
  const httpHandler = useHttpHandler();

  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("search");

  try {
    const data = await BookingService.getListAsync({
      page: page,
      search: search,
      accessToken: session.data.accessToken,
    });

    const response: DataResponse<InBookingDto[]> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (error) {
    return httpHandler.handle(error);
  }
}

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import { BookingService } from "~/services/booking-service";
import { getSession } from "~/session.server";

export async function loaderServer({ request, params }: LoaderFunctionArgs) {
  const httpHandler = useHttpHandler();

  const { id } = params;
  const session = await getSession(request.headers.get("Cookie"));

  try {
    const data = await BookingService.getAsync(+id!, {
      accessToken: session.data.accessToken,
    });

    const response: DataResponse<InBookingDto> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (error) {
    return httpHandler.handle(error);
  }
}

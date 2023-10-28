import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { OutBookingDto } from "~/dtos/booking/out-booking-dto";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import { BookingService } from "~/services/booking-service";
import { getSession } from "~/sessions";

export async function actionServer({ request, params }: ActionFunctionArgs) {
  const httpHandler = useHttpHandler();

  const { id: listingId } = params;

  const session = await getSession(request.headers.get("Cookie"));
  const formData = Object.fromEntries(await request.formData());

  try {
    const data: OutBookingDto = {
      listingId: +listingId!,
      fromDate: +formData["fromDate"],
      toDate: +formData["toDate"],
      guests: [
        {
          type: "Adult",
          count: +formData["adults"],
        },
        {
          type: "Child",
          count: +formData["children"],
        },
        {
          type: "Infants",
          count: +formData["infants"],
        },
      ],
    };

    await BookingService.addAsync(data, { accessToken: session.data.accessToken });
    return redirect("/my-booking");
  } catch (error) {
    return httpHandler.handle(error);
  }
}

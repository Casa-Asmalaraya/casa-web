import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import { ListingService } from "~/services/listing-service";
import { getSession } from "~/sessions";

export async function loaderServer({ request, params }: LoaderFunctionArgs) {
  const httpHandler = useHttpHandler();

  const session = await getSession(request.headers.get("Cookie"));

  const { id: listingId } = params;

  try {
    if (!listingId) {
      return redirect("/listing/form");
    }

    const data = await ListingService.getAsync(+listingId, { accessToken: session.data.accessToken });
    const response: DataResponse<InListingDto> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (error) {
    return httpHandler.handle(error);
  }
}

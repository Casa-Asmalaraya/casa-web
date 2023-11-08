import { LoaderFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import { ListingService } from "~/services/listing-service";
import { getSession } from "~/session.server";

export async function loaderServer({ request }: LoaderFunctionArgs) {
  const httpHandler = useHttpHandler();

  const url = new URL(request.url);
  const session = await getSession(request.headers.get("Cookie"));
  const page = url.searchParams.get("page");
  const search = url.searchParams.get("search");

  try {
    const data = await ListingService.getListAsync({
      page: page,
      search: search,
      accessToken: session.data.accessToken,
    });

    const response: DataResponse<InListingDto[]> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (error) {
    return httpHandler.handle(error);
  }
}

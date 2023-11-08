import { LoaderFunctionArgs, json } from "@remix-run/node";
import { DataResponse } from "~/data-response";
import { InProfileDto } from "~/dtos/profile/in-profile-dto";
import { ProfileService } from "~/services/profile-service";
import { getSession } from "~/session.server";

export async function loaderServer({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.data.accessToken || !session.data.refreshToken) {
    return null;
  }

  try {
    const data = await ProfileService.getAsync({ accessToken: session.data.accessToken });
    const response: DataResponse<InProfileDto> = { method: "GET", statusCode: 200, data: data };
    return json(response);
  } catch (e) {
    return null;
  }
}

import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { useHttpHandler } from "~/hooks/useHttpHandler.server";
import { AuthenticationService } from "~/services/authentication-service";
import { getSession, commitSession } from "~/session.server";

export async function actionServer({ request }: ActionFunctionArgs) {
  const httpHandler = useHttpHandler();

  const session = await getSession(request.headers.get("Cookie"));
  const formData = Object.fromEntries(await request.formData());

  try {
    const response = await AuthenticationService.signInAsync(formData);

    session.set("accessToken", response.accessToken!);
    session.set("refreshToken", response.refreshToken!);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  } catch (error) {
    return httpHandler.handle(error);
  }
}

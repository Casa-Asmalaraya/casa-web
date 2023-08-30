import axios from "axios";
import { useAlertDialog } from "../components/AlertDialog";
import { TypedResponse, json, redirect } from "@remix-run/node";

export function useServerHttpHandler() {
  function handle(error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status == 401) {
          return redirect("/login");
        }

        if (error.response.status === 404 && error.config?.method === "get") {
          return null;
        }

        var body = error.response.data;
        if (!body.errors) {
          return json({ statusCode: error.response.status, data: body.title }, { status: error.response.status });
        }

        var errorMessage = Object.values(body.errors)[0] as string;
        return json({ statusCode: error.response.status, data: errorMessage }, { status: error.response.status });
      }

      if (error.request) {
        return json({ statusCode: 503, data: "Server dalam pemeliharaan" }, { status: 503 });
      }
    }

    return json({ statusCode: 500, data: "Server error" }, { status: 500 });
  }

  return { handle };
}

export function useServerClientMessage() {
  const alertDialog = useAlertDialog();
  async function handle(data: TypedResponse | null) {
    if (!data) {
      return;
    }

    if (data.status >= 200 && data.status <= 299) {
      return;
    }

    alertDialog.showAlertDialog({
      key: "alert",
      title: "Error",
      message: await data.text(),
    });
  }

  return { handle };
}

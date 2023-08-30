import axios from "axios";
import { useAlertDialog } from "../components/AlertDialog";
import { useNavigate } from "@remix-run/react";

export function useClientHttpHandler() {
  const alertDialog = useAlertDialog();
  const navigate = useNavigate();

  function handle(error: any) {
    let message = "Unknown error";
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status == 401) {
          return navigate("/login", { replace: true });
        }

        if (error.response.status === 404 && error.config?.method === "get") {
          return;
        }

        var body = error.response.data;
        if (!body.errors) {
          message = body.title;
        } else {
          message = Object.values(body.errors)[0] as string;
        }
      }

      if (error.request) {
        message = "Tidak terhubung dengan internet";
      }
    }

    alertDialog.showAlertDialog({
      key: "alert",
      title: "Error",
      message: message,
    });
  }

  return { handle };
}

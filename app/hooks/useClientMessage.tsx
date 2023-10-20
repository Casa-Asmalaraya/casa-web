import { useAlertDialog } from "~/components/AlertDialog";
import { isDataResponse } from "~/data-response";

export function useClientMessage() {
  const alertDialog = useAlertDialog();
  async function handle(data: any) {
    if (!data) {
      return;
    }

    if (!isDataResponse(data)) {
      return;
    }

    if (data.statusCode >= 200 && data.statusCode <= 299) {
      return;
    }

    alertDialog.showAlertDialog({
      key: "alert",
      title: "Error",
      message: data.data,
    });
  }

  return { handle };
}

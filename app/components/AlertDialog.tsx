import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { createContext, useContext } from "react";
import { Orb, useCreateOrb, useOrb } from "worb";

interface AlertDialogOptions {
  key: string;
  title: string;
  message: string;
  onClose?: () => void;
}

interface AlertDialogContextValue {
  dialogs: Orb<AlertDialogOptions[]>;
  showAlertDialog: (options: AlertDialogOptions) => void;
  hideAlertDialog: (key: string) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue | undefined>(undefined);

function useAlertDialog() {
  return useContext(AlertDialogContext)!;
}

function AlertDialogProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const dialogs = useCreateOrb<AlertDialogOptions[]>([]);

  function showAlertDialog(options: AlertDialogOptions) {
    dialogs.value = [...dialogs.value, options];
  }

  function hideAlertDialog(key: string) {
    const newDialogs = [...dialogs.value];

    for (let i = 0; i < newDialogs.length; i++) {
      const dialog = newDialogs[i];
      if (dialog.key === key) {
        newDialogs.splice(i, 1);
      }
    }

    dialogs.value = newDialogs;
  }

  return (
    <AlertDialogContext.Provider
      value={{
        dialogs: dialogs,
        showAlertDialog: showAlertDialog,
        hideAlertDialog: hideAlertDialog,
      }}
    >
      {children}
      <AlertDialogPool />
    </AlertDialogContext.Provider>
  );
}

function AlertDialogPool() {
  const alertDialogP = useContext(AlertDialogContext)!;
  const [dialogs] = useOrb(alertDialogP.dialogs);

  return (
    <>
      {dialogs.map((e) => {
        return <AlertDialog key={e.key} options={e} />;
      })}
    </>
  );
}

function AlertDialog({ options }: { options: AlertDialogOptions }) {
  const alertDialogP = useContext(AlertDialogContext)!;

  function onClose() {
    if (options.onClose !== undefined) {
      options.onClose();
    }

    alertDialogP.hideAlertDialog(options.key);
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{options.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{options.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Tutup</Button>
      </DialogActions>
    </Dialog>
  );
}

export type { AlertDialogOptions };
export { useAlertDialog, AlertDialogProvider };

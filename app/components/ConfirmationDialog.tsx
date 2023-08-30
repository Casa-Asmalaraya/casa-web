import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { createContext, useContext } from "react";
import { Orb, useCreateOrb, useOrb } from "worb";

interface ConfirmationDialogOptions {
  key: string;
  title: string;
  message: string;
  okLabel?: string;
  onOk?: () => void;
  onClose?: () => void;
}

interface ConfirmationDialogContextValue {
  dialogs: Orb<ConfirmationDialogOptions[]>;
  showConfirmationDialog: (options: ConfirmationDialogOptions) => void;
  hideConfirmationDialog: (key: string) => void;
}

const ConfirmationDialogContext = createContext<ConfirmationDialogContextValue | undefined>(undefined);

function useConfirmationDialog() {
  return useContext(ConfirmationDialogContext)!;
}

function ConfirmationDialogProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const dialogs = useCreateOrb<ConfirmationDialogOptions[]>([]);

  function showConfirmationDialog(options: ConfirmationDialogOptions) {
    dialogs.value = [...dialogs.value, options];
  }

  function hideConfirmationDialog(key: string) {
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
    <ConfirmationDialogContext.Provider
      value={{
        dialogs: dialogs,
        showConfirmationDialog: showConfirmationDialog,
        hideConfirmationDialog: hideConfirmationDialog,
      }}
    >
      {children}
      <ConfirmationDialogPool />
    </ConfirmationDialogContext.Provider>
  );
}

function ConfirmationDialogPool() {
  const confirmationDialogP = useContext(ConfirmationDialogContext)!;
  const [dialogs] = useOrb(confirmationDialogP.dialogs);

  return (
    <>
      {dialogs.map((e) => {
        return <ConfirmationDialog key={e.key} options={e} />;
      })}
    </>
  );
}

function ConfirmationDialog({ options }: { options: ConfirmationDialogOptions }) {
  const confirmationDialogP = useContext(ConfirmationDialogContext)!;

  function onClose() {
    if (options.onClose !== undefined) {
      options.onClose();
    }

    confirmationDialogP.hideConfirmationDialog(options.key);
  }

  function onOk() {
    if (options.onOk !== undefined) {
      options.onOk();
    }

    confirmationDialogP.hideConfirmationDialog(options.key);
  }

  return (
    <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>{options.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{options.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button onClick={onOk}>{options.okLabel ?? "Ok"}</Button>
      </DialogActions>
    </Dialog>
  );
}

export type { ConfirmationDialogOptions };
export { useConfirmationDialog, ConfirmationDialogProvider };

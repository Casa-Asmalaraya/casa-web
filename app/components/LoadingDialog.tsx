import { Backdrop, CircularProgress } from "@mui/material";
import { createContext, useContext } from "react";
import { Orb, useCreateOrb, useOrb } from "worb";

interface LoadingDialogContextValue {
  isOpen: Orb<boolean>;
  showLoadingDialog: () => void;
  hideLoadingDialog: () => void;
}

const LoadingDialogContext = createContext<LoadingDialogContextValue | undefined>(undefined);

function useLoadingDialog() {
  return useContext(LoadingDialogContext)!;
}

function LoadingDialogProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const isOpen = useCreateOrb(false);

  function showLoadingDialog() {
    isOpen.value = true;
  }

  function hideLoadingDialog() {
    isOpen.value = false;
  }

  return (
    <LoadingDialogContext.Provider
      value={{
        isOpen: isOpen,
        showLoadingDialog: showLoadingDialog,
        hideLoadingDialog: hideLoadingDialog,
      }}
    >
      {children}
      <LoadingDialog />
    </LoadingDialogContext.Provider>
  );
}

function LoadingDialog() {
  const LoadingDialog = useLoadingDialog();
  const [isOpen] = useOrb(LoadingDialog.isOpen);

  return (
    <Backdrop open={isOpen}>
      <CircularProgress />
    </Backdrop>
  );
}

export { useLoadingDialog, LoadingDialogProvider };

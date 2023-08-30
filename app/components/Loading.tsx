import { Box, LinearProgress } from "@mui/material";
import { createContext, useContext } from "react";
import { Orb, useCreateOrb, useOrb } from "worb";

interface LoadingContextValue {
  isShowLoading: Orb<boolean>;
  showLoading: () => {};
  hideLoading: () => {};
}

const LoadingContext = createContext<LoadingContextValue | undefined>(undefined);

function useLoading() {
  return useContext(LoadingContext)!;
}

function LoadingProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const isShowLoading = useCreateOrb(false);

  return (
    <LoadingContext.Provider
      value={{
        isShowLoading: isShowLoading,
        showLoading: () => (isShowLoading.value = true),
        hideLoading: () => (isShowLoading.value = false),
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Loading />
        <Box
          sx={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </LoadingContext.Provider>
  );
}

function Loading() {
  const LoadingModalP = useContext(LoadingContext)!;
  const [isShowLoading] = useOrb(LoadingModalP.isShowLoading);

  if (isShowLoading) {
    return <LinearProgress />;
  }

  return <></>;
}

export type { LoadingContextValue };
export { useLoading, LoadingProvider };

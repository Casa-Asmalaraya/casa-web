import { createContext, useContext } from "react";
import { InProfileDto } from "~/dtos/profile/in-profile-dto";

export interface AppContextType {
  profile?: InProfileDto;
}

export const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const appContext = useContext(AppContext);
  return appContext;
}

export function AppContextProvider({ children, value }: { children: JSX.Element; value: AppContextType }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

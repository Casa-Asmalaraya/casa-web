import { useApp } from "../providers/AppProvider";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Stack } from "@mui/material";
import { useOrb } from "worb";
import { useEffect } from "react";

function GuardedRoute({ children }: { children: JSX.Element }) {
  const app = useApp();
  const navigate = useNavigate();

  const [isAuthenticated] = useOrb(app.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated !== undefined && isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Stack flex="1" alignItems="center" justifyContent="center">
        <CircularProgress></CircularProgress>
      </Stack>
    );
  }

  return children;
}

export default GuardedRoute;

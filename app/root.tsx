import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useNavigation } from "@remix-run/react";
import { ThemeProvider } from "@mui/material";
import { AlertDialogProvider } from "./components/AlertDialog";
import { ConfirmationDialogProvider } from "./components/ConfirmationDialog";
import { LoadingProvider, useLoading } from "./components/Loading";
import { LoadingDialogProvider, useLoadingDialog } from "./components/LoadingDialog";
import theme from "./theme";
import { useContext, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { withEmotionCache } from "@emotion/react";
import ClientStyleContext from "./contexts/ClientStyleContext";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

export function meta() {
  return [{ title: "lokalplace" }];
}

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

export default function Root() {
  return (
    <Document>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <LoadingProvider>
            <LoadingDialogProvider>
              <AlertDialogProvider>
                <ConfirmationDialogProvider>
                  <App />
                </ConfirmationDialogProvider>
              </AlertDialogProvider>
            </LoadingDialogProvider>
          </LoadingProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </Document>
  );
}

function App() {
  const navigation = useNavigation();
  const loading = useLoading();
  const loadingDialog = useLoadingDialog();

  useEffect(() => {
    if (navigation.state === "submitting") {
      loadingDialog.showLoadingDialog();
    }

    if (navigation.state === "loading") {
      loading.showLoading();
    }

    if (navigation.state === "idle") {
      loading.hideLoading();
      loadingDialog.hideLoadingDialog();
    }
  }, [navigation.state]);

  return <Outlet />;
}

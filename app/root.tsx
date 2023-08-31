import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { LoadingProvider } from "./components/Loading";
import { LoadingDialogProvider } from "./components/LoadingDialog";
import { AlertDialogProvider } from "./components/AlertDialog";
import { ConfirmationDialogProvider } from "./components/ConfirmationDialog";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* All meta exports on all routes will go here */}
        <Meta />

        {/* All link exports on all routes will go here */}
        <Links />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Open+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <LoadingProvider>
            <LoadingDialogProvider>
              <AlertDialogProvider>
                <ConfirmationDialogProvider>
                  {/* Child routes go here */}
                  <Outlet />
                </ConfirmationDialogProvider>
              </AlertDialogProvider>
            </LoadingDialogProvider>
          </LoadingProvider>
        </ThemeProvider>

        {/* Manages scroll position for client-side transitions */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <ScrollRestoration />

        {/* Script tags go here */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <Scripts />

        {/* Sets up automatic reload when you change code */}
        {/* and only does anything during development */}
        {/* If you use a nonce-based content security policy for scripts, you must provide the `nonce` prop. Otherwise, omit the nonce prop as shown here. */}
        <LiveReload />
      </body>
    </html>
  );
}

import { Stack, Typography } from "@mui/material";

function Header({
  title,
  breadcrumb,
  children,
}: {
  title: string;
  breadcrumb?: JSX.Element;
  children?: JSX.Element | JSX.Element[];
}) {
  return (
    <Stack spacing="16px">
      {breadcrumb}
      <Stack direction={{ xs: "column", sm: "row" }} spacing="16px">
        <Typography flex="1" component="h1" variant="h4" noWrap>
          {title}
        </Typography>
        {children}
      </Stack>
    </Stack>
  );
}

export default Header;

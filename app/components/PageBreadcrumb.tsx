import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type PageBreadcrumbValue = {
  name: string;
  to?: string;
};

function PageBreadcrumb({ children }: { children: JSX.Element | JSX.Element[] }) {
  return <Breadcrumbs aria-label="breadcrumb">{children}</Breadcrumbs>;
}

function PageBreadcrumbItem({ name, to }: { name: string; to?: string }) {
  if (to === null || to === undefined) {
    return <Typography color="primary">{name}</Typography>;
  }

  return (
    <Link underline="hover" component={RouterLink} color="inherit" to={to}>
      {name}
    </Link>
  );
}

export type { PageBreadcrumbValue };
export { PageBreadcrumb, PageBreadcrumbItem };

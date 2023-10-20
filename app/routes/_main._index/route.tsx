import { Grid } from "@mui/material";
import type { V2_MetaFunction } from "@remix-run/node";
import ListingCard from "./ListingCard";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Cari, Datang, Healing - LocalPlace" }];
};

export default function Page() {
  return (
    <Grid container spacing={"16px"} columns={60}>
      {[...Array(30)].map((_, i) => (
        <Grid key={i} item xs={60} sm={30} md={20} lg={15}>
          <ListingCard />
        </Grid>
      ))}
    </Grid>
  );
}

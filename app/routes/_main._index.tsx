import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import type { V2_MetaFunction } from "@remix-run/node";

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

function ListingCard() {
  return (
    <Card variant={"outlined"}>
      <CardMedia
        sx={{ height: 150 }}
        image="https://a0.muscache.com/im/pictures/bd5d1aa8-9447-44cd-8532-18918803df6b.jpg?im_w=720"
        title="The Home Stay Thumbnail Image"
      />
      <CardContent>
        <Typography
          variant={"body1"}
          fontWeight={"500"}
          mb={"4px"}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          The HomeStay
        </Typography>
        <Typography
          variant={"body2"}
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
          }}
        >
          Nusa Dua, Badung
        </Typography>
        <Typography variant={"body2"} mb={"8px"}>
          5 Reviews
        </Typography>
        <Typography variant={"body1"} fontWeight={"700"}>
          IDR 200,000
        </Typography>
      </CardContent>
    </Card>
  );
}

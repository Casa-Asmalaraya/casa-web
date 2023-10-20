import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function ListingCard() {
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

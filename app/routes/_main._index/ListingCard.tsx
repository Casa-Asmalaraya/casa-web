import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNumericFormat } from "react-number-format";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { Link } from "@remix-run/react";

export default function ListingCard({ listing }: { listing: InListingDto }) {
  const numbericFormat = useNumericFormat({ thousandSeparator: true });
  const slug = listing.name
    ?.toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return (
    <Link to={`/listing/${listing.id}/${slug}`} style={{ textDecoration: "unset" }}>
      <Card variant={"outlined"} sx={{ borderRadius: "16px" }}>
        <CardMedia sx={{ height: 150 }} image={listing.coverPhoto?.url} title="The Home Stay Thumbnail Image" />
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
            {listing.name}
          </Typography>
          <Typography
            variant={"body2"}
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
            }}
            textTransform={"capitalize"}
          >
            {listing.province?.name?.toLowerCase()}, {listing.regency?.name?.toLowerCase()}
          </Typography>
          <Typography variant={"body2"} mb={"8px"}>
            5 Reviews
          </Typography>
          <Typography variant={"body1"} fontWeight={"500"}>
            IDR {numbericFormat.format!((listing.price ?? 0).toString())}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

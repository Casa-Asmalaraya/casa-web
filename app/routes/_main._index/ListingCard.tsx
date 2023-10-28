import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNumericFormat } from "react-number-format";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import { Link } from "@remix-run/react";
import { UrlUtils } from "~/utils/url-utils";

export default function ListingCard({ listing }: { listing: InListingDto }) {
  const numbericFormat = useNumericFormat({ thousandSeparator: true });

  return (
    <Link to={`/listing/${listing.id}/${UrlUtils.createSlug(listing.name!)}`} style={{ textDecoration: "unset" }}>
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
            {listing.regency?.name?.toLowerCase()}, {listing.province?.name?.toLowerCase()}
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

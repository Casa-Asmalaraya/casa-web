import { Grid } from "@mui/material";
import { Orb, useOrb } from "worb";
import NoDataMessage from "~/components/NoDataMessage";
import { InListingDto } from "~/dtos/listing/in-listing-dto";
import ListingCard from "./ListingCard";

export default function Listing({ data }: { data: Orb<InListingDto[]> }) {
  const [dataValue] = useOrb(data);

  if (dataValue.length === 0) {
    return <NoDataMessage />;
  }

  return (
    <Grid container spacing={"16px"} columns={60}>
      {dataValue.map((item, i) => (
        <Grid key={i} item xs={60} sm={30} md={20} lg={15}>
          <ListingCard listing={item} />
        </Grid>
      ))}
    </Grid>
  );
}

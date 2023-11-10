import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { TableRow, TableCell, Stack, IconButton } from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { DateTime } from "luxon";
import { useRef } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { Orb, useOrb } from "worb";
import NoDataMessage from "~/components/NoDataMessage";
import VirtuosoTableComponents from "~/components/VirtuosoTableComponents";
import { InBookingDto } from "~/dtos/booking/in-booking-dto";

export default function PageTable({ data, onEndReached }: { data: Orb<InBookingDto[]>; onEndReached: () => void }) {
  const navigate = useNavigate();
  const [dataValue] = useOrb(data);
  const virtuosoTableComponent = useRef(VirtuosoTableComponents<InBookingDto>());

  if (dataValue.length === 0) {
    return <NoDataMessage />;
  }

  return (
    <TableVirtuoso<InBookingDto>
      data={dataValue}
      style={{ flex: "1" }}
      components={virtuosoTableComponent.current}
      endReached={onEndReached}
      fixedHeaderContent={() => (
        <TableRow
          sx={{
            backgroundColor: "background.paper",
          }}
        >
          <TableCell sx={{ whiteSpace: "nowrap" }}>Foto</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>Listing</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>Dibuat Pada</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>Status</TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
      itemContent={(_, item) => (
        <>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            <img src={item.listing!.coverPhoto!.url} width={150} />
          </TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>{item.listing?.name}</TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            {DateTime.fromMillis(item.createdAt!).toFormat("cccc, dd LLL yyyy")}
          </TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            {item.payment?.paymentStatus == "Paid" ? item.status : "Unpaid"}
          </TableCell>
          <TableCell sx={{ whiteSpace: "nowrap" }}>
            <Stack direction="row" justifyContent="end">
              <IconButton onClick={() => navigate(`/my-booking/${item.id}`)}>
                <RemoveRedEyeOutlined />
              </IconButton>
            </Stack>
          </TableCell>
        </>
      )}
    />
  );
}

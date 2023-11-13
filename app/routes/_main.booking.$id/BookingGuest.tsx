import { Button, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";

export function BookingGuest({
  adults,
  children,
  infants,
  setAdults,
  setChildren,
  setInfants,
}: {
  adults: number;
  children: number;
  infants: number;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setInfants: (value: number) => void;
}) {
  return (
    <Stack>
      <Typography variant="h6">Jumlah Tamu</Typography>
      <List disablePadding>
        <ListItem
          disableGutters
          secondaryAction={
            <Stack direction={"row"} alignItems={"center"} spacing={"16px"}>
              <Button
                variant="outlined"
                onClick={() => {
                  if (adults == 1) {
                    return;
                  }

                  setAdults(adults - 1);
                }}
              >
                <Typography variant="h6">-</Typography>
              </Button>
              <Typography>{adults}</Typography>
              <Button variant="outlined" onClick={() => setAdults(adults + 1)}>
                <Typography variant="h6">+</Typography>
              </Button>
            </Stack>
          }
        >
          <ListItemText primary="Dewasa" secondary="Umur diatas 13 tahun" />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Stack direction={"row"} alignItems={"center"} spacing={"16px"}>
              <Button
                variant="outlined"
                onClick={() => {
                  if (children == 0) {
                    return;
                  }

                  setChildren(children - 1);
                }}
              >
                <Typography variant="h6">-</Typography>
              </Button>
              <Typography>{children}</Typography>
              <Button variant="outlined" onClick={() => setChildren(children + 1)}>
                <Typography variant="h6">+</Typography>
              </Button>
            </Stack>
          }
        >
          <ListItemText primary="Anak-anak" secondary="Umur 2-12 tahun" />
        </ListItem>
        <ListItem
          disableGutters
          secondaryAction={
            <Stack direction={"row"} alignItems={"center"} spacing={"16px"}>
              <Button
                variant="outlined"
                onClick={() => {
                  if (infants == 0) {
                    return;
                  }

                  setInfants(infants - 1);
                }}
              >
                <Typography variant="h6">-</Typography>
              </Button>
              <Typography>{infants}</Typography>
              <Button variant="outlined" onClick={() => setInfants(infants + 1)}>
                <Typography variant="h6">+</Typography>
              </Button>
            </Stack>
          }
        >
          <ListItemText primary="Bayi" secondary="Umur dibawah 2 tahun" />
        </ListItem>
      </List>
    </Stack>
  );
}

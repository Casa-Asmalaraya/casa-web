import { Button, Container, Stack, TextField } from "@mui/material";
import { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Masuk - LocalPlace" }];
};

export default function Page() {
  return (
    <Container sx={{ display: "flex", flex: 1, alignItems: "center" }} maxWidth="xs">
      <Stack flex={1} gap={"16px"}>
        <TextField label="Alamat Email" type="email"></TextField>
        <TextField label="Password" type="password"></TextField>
        <Button type="submit" variant="contained" disableElevation>
          Masuk
        </Button>
      </Stack>
    </Container>
  );
}

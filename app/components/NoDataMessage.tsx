import { Box, Stack, Typography, lighten, useTheme } from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

function NoDataMessage() {
  const theme = useTheme();

  return (
    <Stack flex="1" alignItems="center" justifyContent="center" spacing="16px">
      <Box
        sx={{ background: lighten(theme.palette.primary.main, 0.9) }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100px"
        height="100px"
        borderRadius="100%"
      >
        <InboxOutlinedIcon sx={{ fontSize: "48px" }} color="primary" />
      </Box>
      <Typography variant="h6" color="primary">
        Tidak ada data untuk ditampilkan
      </Typography>
    </Stack>
  );
}

export default NoDataMessage;

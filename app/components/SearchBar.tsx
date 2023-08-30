import { Box, IconButton, InputBase, Stack, useTheme } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ onChanged }: { onChanged: (value?: string) => void }) {
  const theme = useTheme();

  const [value, setValue] = useState("");

  return (
    <Box p="8px" sx={{ backgroundColor: theme.palette.grey[100], borderRadius: 30 }}>
      <Stack direction="row">
        <InputBase
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(key) => {
            if (key.code === "Enter") {
              onChanged(value.trim() !== "" ? value : undefined);
            }
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Cari..."
        />
        {value !== "" && (
          <IconButton
            size="small"
            onClick={() => {
              setValue("");
              onChanged(undefined);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        )}
      </Stack>
    </Box>
  );
}

export default SearchBar;

import {
  AccountCircleOutlined,
  SettingsOutlined,
  LogoutOutlined,
  PaymentOutlined,
  BedOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Stack,
  Button,
  Box,
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Divider,
} from "@mui/material";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import logo from "~/assets/logo-text.png";
import { useAppContext } from "~/contexts/AppContext";
import { AvatarUtils } from "~/utils/avatar-utils";

export default function MainAppBar() {
  const navigate = useNavigate();
  const appContext = useAppContext();

  return (
    <AppBar position="fixed" elevation={0} component={"nav"}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            component="a"
            href="/"
            flex="1"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img width={"100px"} src={logo} />
          </Box>
          <Stack gap={"8px"} direction={"row"} mr={"32px"}>
            <Button onClick={() => navigate("/my-booking")}>Cek Booking</Button>
          </Stack>
          {appContext?.profile ? (
            <Profile />
          ) : (
            <Stack gap={"8px"} direction={"row"}>
              <Button variant="outlined" onClick={() => navigate("/login")}>
                Masuk
              </Button>
              <Button variant="contained" disableElevation onClick={() => navigate("/register")}>
                Daftar
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
      <Divider></Divider>
    </AppBar>
  );
}

function Profile() {
  const appContext = useAppContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function closeMenu() {
    setAnchorEl(null);
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={openMenu} sx={{ p: 0 }}>
        <Avatar {...AvatarUtils.stringAvatar(appContext?.profile?.name ?? "Unknown")} />
      </IconButton>
      <Menu
        sx={{ mt: "48px" }}
        slotProps={{ paper: { sx: { width: "200px", borderRadius: "16px" }, variant: "outlined", elevation: 0 } }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={!!anchorEl}
        onClose={closeMenu}
        anchorEl={anchorEl}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <AccountCircleOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profil</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PaymentOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Saldo Saya</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <BedOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cek Booking</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <LogoutOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

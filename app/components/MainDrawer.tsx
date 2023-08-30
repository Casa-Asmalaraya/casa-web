import {
  InsightsOutlined,
  Inventory2Outlined,
  StoreOutlined,
  AccountCircleOutlined,
  ReceiptOutlined,
  WorkspacesOutlined,
  FastfoodOutlined,
  DiscountOutlined,
  InventoryOutlined,
  BlenderOutlined,
  ShoppingBasketOutlined,
  CalculateOutlined,
  PlaylistAddCheckOutlined,
  LocalShippingOutlined,
  PersonOutlineOutlined,
  PeopleAltOutlined,
  BadgeOutlined,
  Menu,
} from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from "@mui/material";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Orb, useCreateOrb, useOrb } from "worb";
import logoText from "../assets/logos/logo_text.png";
import { Link } from "@remix-run/react";

interface MainDrawerContextValue {
  isDrawerOpen: Orb<boolean>;
}

interface DrawerMenu {
  title: string;
  menu: DrawerMenuItem[];
}

interface DrawerMenuItem {
  title: string;
  to: string;
  icon: ReactNode;
}
const MainDrawerContext = createContext<MainDrawerContextValue | undefined>(undefined);

const drawerMenu: DrawerMenu[] = [
  {
    title: "Laporan",
    menu: [
      { title: "Penjualan", to: "/dashboard", icon: <InsightsOutlined /> },
      { title: "Berdasarkan Item", to: "/dashboard", icon: <Inventory2Outlined /> },
      { title: "Berdasarkan Toko", to: "/dashboard", icon: <StoreOutlined /> },
      { title: "Berdasarkan Pengguna", to: "/dashboard", icon: <AccountCircleOutlined /> },
      { title: "Struk", to: "/dashboard", icon: <ReceiptOutlined /> },
    ],
  },
  {
    title: "Barang",
    menu: [
      { title: "Kategori", to: "/dashboard", icon: <WorkspacesOutlined /> },
      { title: "Barang", to: "/dashboard", icon: <Inventory2Outlined /> },
      { title: "Resep", to: "/dashboard", icon: <FastfoodOutlined /> },
      { title: "Promo", to: "/dashboard", icon: <DiscountOutlined /> },
    ],
  },
  {
    title: "Gudang",
    menu: [
      { title: "Stok", to: "/dashboard", icon: <InventoryOutlined /> },
      { title: "Produksi", to: "/dashboard", icon: <BlenderOutlined /> },
      { title: "Purchase Order", to: "/dashboard", icon: <ShoppingBasketOutlined /> },
      { title: "Penyesuaian Stok", to: "/dashboard", icon: <CalculateOutlined /> },
      { title: "Stok Opname", to: "/dashboard", icon: <PlaylistAddCheckOutlined /> },
      { title: "Transfer Stok", to: "/dashboard", icon: <LocalShippingOutlined /> },
    ],
  },
  {
    title: "Kontak",
    menu: [
      { title: "Pelanggan", to: "/dashboard", icon: <PersonOutlineOutlined /> },
      { title: "Supplier", to: "/dashboard", icon: <PeopleAltOutlined /> },
    ],
  },
  {
    title: "Bisnis",
    menu: [
      { title: "Role", to: "/dashboard", icon: <BadgeOutlined /> },
      { title: "Pengguna", to: "/dashboard", icon: <AccountCircleOutlined /> },
      { title: "Toko", to: "/dashboard", icon: <StoreOutlined /> },
    ],
  },
];

function useMainDrawerContext() {
  return useContext(MainDrawerContext);
}

export function MainDrawerContextProvider({ children }: { children: ReactNode }) {
  const isDrawerOpen = useCreateOrb(false);
  return <MainDrawerContext.Provider value={{ isDrawerOpen: isDrawerOpen }}>{children}</MainDrawerContext.Provider>;
}

export function MainDrawerAppBar() {
  const mainDrawerContext = useMainDrawerContext()!;
  const [_, setIsDrawerOpen] = useOrb(mainDrawerContext.isDrawerOpen);

  return (
    <AppBar
      position="static"
      sx={{
        display: { xs: "block", md: "none" },
        borderBottom: "1px solid",
        borderColor: "grey.300",
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton edge="start" onClick={() => setIsDrawerOpen(true)} sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Box display="flex" alignItems="center">
          <img src={logoText} width="75px" alt="Weaze Logo" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export function MainDrawer() {
  const mainDrawerContext = useMainDrawerContext()!;
  const [isDrawerOpen, setIsDrawerOpen] = useOrb(mainDrawerContext.isDrawerOpen);

  const drawerWidth = 300;
  const [container, setContainer] = useState<(() => HTMLElement) | undefined>(undefined);

  useEffect(() => {
    setContainer(window !== undefined ? () => window.document.body : undefined);
  }, []);

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        container={container}
        variant="temporary"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <DrawerBody />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <DrawerBody />
      </Drawer>
    </Box>
  );
}

function DrawerBody() {
  return (
    <div>
      <Box display="flex" alignItems="center" padding="16px">
        <img src={logoText} width="75px" alt="Weaze Logo" />
      </Box>
      {drawerMenu.map((e, index) => {
        const menuGroup = (
          <List key={e.title} subheader={<ListSubheader>{e.title}</ListSubheader>}>
            {e.menu.map((el) => {
              return (
                <ListItemButton key={el.title} component={Link} to={el.to}>
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText>{el.title}</ListItemText>
                </ListItemButton>
              );
            })}
          </List>
        );

        return index != drawerMenu.length - 1 ? (
          <>
            {menuGroup}
            <Divider />
          </>
        ) : (
          menuGroup
        );
      })}
    </div>
  );
}

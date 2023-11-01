import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import { useState } from "react";

import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Divider,
  Typography,
  CssBaseline,
  styled,
  Box,
} from "../../constants/muiConstants";

import { Outlet } from "react-router-dom";

const drawerWidth = 240;

import DashboardIcon from "@mui/icons-material/Dashboard";
import {
  DomainOutlined,
  DataSaverOffOutlined,
  SummarizeOutlined,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";

// import PersonIcon from "@mui/icons-material/Person";

// import AssignmentIcon from "@mui/icons-material/Assignment";

// import Inventory2Icon from "@mui/icons-material/Inventory2";

export const menus = [
  {
    id: 1,
    route: {
      name: "dashboard",
      title: "Home",
      icon: <DashboardIcon sx={{ color: "black" }} />,
    },
    active: true,
  },
  {
    id: 2,
    route: {
      name: "trade-management",
      title: "Trade Management",
      icon: <DataSaverOffOutlined sx={{ color: "black" }} />,
    },
    active: false,
  },
  {
    id: 3,
    route: {
      name: "reports",
      title: "Generate Reports",
      icon: <SummarizeOutlined sx={{ color: "black" }} />,
    },
    active: false,
  },
];

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const ListItems = ({ menusData, handleMenuClick }) => {
  return (
    <List>
      {menusData.map((menu) => (
        <ListItem
          key={menu.id}
          disablePadding
          sx={{ my: "1em" }}
          // sx={{ my: "1em", width: "90%", borderRadius: "50%", mx: "auto" }}
          onClick={() => handleMenuClick(menu.id, menu.route.name)}
        >
          <ListItemButton>
            <ListItemIcon>{menu.route.icon}</ListItemIcon>
            <Typography sx={{ fontWeight: "600", fontSize: ".8rem" }}>
              {menu.route.title}
            </Typography>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const MainContent = () => {
  return <Outlet />;
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Drawer = ({ children, open, handleDrawerClose, handleMenuClick }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {children}

      <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            // background: `${theme?.palette?.primary?.main}`,
            // color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <ListItems menusData={menus} handleMenuClick={handleMenuClick} />
      </MuiDrawer>
      <Main open={open}>
        <DrawerHeader />
        <MainContent />
      </Main>
    </Box>
  );
};

export default Drawer;

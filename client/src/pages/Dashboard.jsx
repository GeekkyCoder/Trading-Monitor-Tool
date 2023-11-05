import { useNavigate } from "react-router-dom";

import Drawer from "../components/Drawer/Drawer";
import AppBar from "../components/AppBar/AppBar";

import { Box, Avatar } from "@mui/material";

import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { DataSaverOffOutlined, SummarizeOutlined } from "@mui/icons-material";
import Typography from "../components/Typography/Typography";

const menus = [
  {
    id: 1,
    route: {
      name: "dashboard",
      title: "Home",
      icon: <DashboardIcon sx={{ color: "#fff" }} />,
    },
    active: true,
  },
  {
    id: 2,
    route: {
      name: "trade-management",
      title: "Trade Management",
      icon: <DataSaverOffOutlined sx={{ color: "#fff" }} />,
    },
    active: false,
  },
  {
    id: 3,
    route: {
      name: "reports",
      title: "Generate Reports",
      icon: <SummarizeOutlined sx={{ color: "#fff" }} />,
    },
    active: false,
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (id, name) => {
    switch (name) {
      case "trade-management":
        navigate("/trade-management");
        return;
      case "reports":
        navigate("/reports");
        return;
      default:
        navigate("/");
    }
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleMenuClick={handleMenuClick}
        menus={menus}
      >
        <AppBar handleDrawerOpen={handleDrawerOpen} open={open}>
          {/* <Box>Hello World</Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              ml: "auto",
            }}
          >
            <Avatar
              alt="uk-traders"
              src="https://static.vecteezy.com/system/resources/previews/000/546/910/original/fox-face-logo-vector-icon.jpg"
              sx={{ mr: "1em" }}
            />
            <Typography
              component={"span"}
              variant={"p"}
              sx={{
                fontSize: "1.5rem",
                fontWeight: "800",
                fontFamily: "inherit",
              }}
            >
              UK TRADERS
            </Typography>
          </Box>
        </AppBar>
      </Drawer>
    </>
  );
};

export default Dashboard;

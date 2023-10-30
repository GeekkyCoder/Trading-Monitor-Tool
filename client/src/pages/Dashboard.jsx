import Drawer from "../components/Drawer/Drawer";
import AppBar from "../components/AppBar/AppBar";

import { Box } from "@mui/material";

import { useState } from "react";

const Dashboard = () =>  {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {};

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
      >
        <AppBar handleDrawerOpen={handleDrawerOpen} open={open}>
          <Box>Hello World</Box>
        </AppBar>
      </Drawer>
    </>
  );
}

export default Dashboard;
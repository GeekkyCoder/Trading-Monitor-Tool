import { useState } from "react";
import ActiveTrdesTable from "./Table/ActiveTradesTable";
import StoppedTradesTable from "./Table/StoppedTradesTable";

import Button from "../components/Button/Button";
import { Shop } from "@mui/icons-material";
import useDialog from "../hooks/useDialog";
import Dialog from "../components/Dialog/Dialog";
import AddTradeForm from "./AddTradeForm";

import { DialogTitle, Divider } from "../constants/muiConstants";

const TradeManagement = () => {
  const { handleClose, handleOpen, open } = useDialog();

  return (
    <>
      <Button
        variant={"contained"}
        fullWidth={false}
        icon={<Shop />}
        onClickHandler={handleOpen}
        type={"button"}
        sx={{ my: "1em", mb: "3em" }}
      >
        New Trade
      </Button>
      <>
        <Dialog
          fullScreen={false}
          fullWidth={true}
          maxWidth={"md"}
          handleClose={handleClose}
          open={open}
        >
          <DialogTitle>New Trade Record 🚀</DialogTitle>
          <Divider />
          <AddTradeForm handleClose={handleClose} />
        </Dialog>
      </>
      <ActiveTrdesTable />
      <StoppedTradesTable />
    </>
  );
};

export default TradeManagement;

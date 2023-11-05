import { useState } from "react";

import { MonitorHeartOutlined } from "@mui/icons-material";
import Button from "../components/Button/Button";

import { Box, Card, Divider, Typography } from "../constants/muiConstants";

import NoData from "../images/no-data.png";

import useDialog from "../hooks/useDialog";
import Dialog from "../components/Dialog/Dialog";
import SpecificMonthRecord from "./SpecificMonthRecord";
import { dateFormat } from "../utils/dateFormat";

const Reoprts = () => {
  const [tradeData, setTradeData] = useState([]);
  const { handleClose, handleOpen, open } = useDialog();

  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        fullWidth={true}
        fullScreen={false}
        maxWidth="sm"
      >
        <SpecificMonthRecord
          handleClose={handleClose}
          setTradeData={setTradeData}
        />
      </Dialog>
      <Button
        variant={"contained"}
        fullWidth={false}
        onClickHandler={handleOpen}
        type={"button"}
        icon={<MonitorHeartOutlined />}
      >
        Generate Report
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {tradeData.length > 0 ? (
          <Card sx={{ p: "2em" }}>
            <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
              Records from {dateFormat(tradeData[0].startMonth)}{" "}
            </Typography>{" "}
            To
            <Typography component={"span"} variant="p" sx={{ ml: "1em" }}>
              {dateFormat(tradeData[0].endMonth)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: "2em",
              }}
            >
              <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
                Total Profit:
              </Typography>{" "}
              <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
                <strong>$ {tradeData[0].total_profit}</strong>
              </Typography>{" "}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: "2em",
              }}
            >
              <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
                Total loss:
              </Typography>{" "}
              <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
                <strong>$ {tradeData[0].total_loss}</strong>
              </Typography>{" "}
            </Box>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: "2em",
              }}
            >
              <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
                Total Gain:
              </Typography>{" "}
              <Typography component={"span"} variant="p" sx={{ mr: "1em" }}>
                <strong>
                  $ {tradeData[0].total_profit - tradeData[0].total_loss}
                </strong>
              </Typography>{" "}
            </Box>
          </Card>
        ) : (
          <>
            <Box sx={{ width: "30%" }}>
              <img width={"100%"} src={NoData} alt="no-data" />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Reoprts;

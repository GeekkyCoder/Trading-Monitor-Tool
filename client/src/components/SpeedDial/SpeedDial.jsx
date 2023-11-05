import {
  Box,
  styled,
  SpeedDial as MuiSpeedDial,
  SpeedDialAction,
  Card,
  Avatar,
  Tooltip,
} from "../../constants/muiConstants";

import NoDataPng from "../../images/no-data.png";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";
// import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
// import SaveIcon from "@mui/icons-material/Save";
import { DeleteOutline } from "@mui/icons-material";
import { CheckBoxOutlineBlank } from "@mui/icons-material";
import Dialog from "../Dialog/Dialog";
import Typography from "../Typography/Typography";
import useRequest from "../../hooks/useRequest";
import { useState } from "react";
import Button from "../Button/Button";

const StyledSpeedDial = styled(MuiSpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    // right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(2),
    // left: theme.spacing(2),
  },
}));

const SpeedDial = ({
  direction,
  hidden,
  handleDialogOpen,
  toggleCheckBox,
  open,
  handleDialogClose,
  selectedCells,
}) => {
  const [selectedCellId, setSelectedCellId] = useState(null);

  const { mutateAsync: singleMutateDelete } = useRequest().useDelete(
    `trade/delete?id=${selectedCellId}`,
    ["delete"]
  );

  const { mutateAsync: manyDeleteMutate } = useRequest().useDelete(
    `trade/delete/specific?ids=${selectedCells
      .map((cell) => cell.id)
      .join(",")}`,
    ["delete-specific"]
  );

  const handleDeleteClick = () => {
    handleDialogOpen();
  };

  const handleDeleteOne = async (e, cell) => {
    setSelectedCellId(cell.id);
    const data = await singleMutateDelete();
    try {
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMany = async () => {
    try {
      await manyDeleteMutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box sx={{ transform: "translateZ(0px)" }}>
        <Box sx={{ position: "relative", my: "1em", height: 50 }}>
          <StyledSpeedDial
            ariaLabel="SpeedDial playground"
            hidden={hidden}
            icon={<SpeedDialIcon />}
            direction={direction}
          >
            <SpeedDialAction
              key={"Delete"}
              icon={<DeleteOutline />}
              tooltipTitle={"Delete"}
              onClick={handleDeleteClick}
            />

            <SpeedDialAction
              key={"Checkbox"}
              icon={<CheckBoxOutlineBlank />}
              tooltipTitle={"Show/Hide checkboxes"}
              onClick={toggleCheckBox}
            />
          </StyledSpeedDial>

          <Dialog
            open={open}
            fullScreen={false}
            fullWidth={"sm"}
            handleClose={handleDialogClose}
          >
            <>
              {selectedCells?.length > 0 ? (
                <>
                  {" "}
                  <Typography
                    component={"div"}
                    variant={"p"}
                    sx={{
                      fontSize: "2rem",
                      textAlign: "center",
                      my: "2em",
                      fontWeight: "600",
                    }}
                  >
                    Delete your Trades
                  </Typography>
                  <Button
                    type={"button"}
                    fullWidth={false}
                    onClickHandler={handleDeleteMany}
                    variant={"contained"}
                    loading={false}
                    icon={<DeleteOutline />}
                  >
                    Delete All
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      my: "2em",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "95%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        component={"div"}
                        variant={"p"}
                        sx={{ fontWeight: "600" }}
                      >
                        {"Action"}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant={"p"}
                        sx={{ fontWeight: "600" }}
                      >
                        {"Trade Name"}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant={"p"}
                        sx={{ fontWeight: "600" }}
                      >
                        {"Profit"}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant={"p"}
                        sx={{ fontWeight: "600" }}
                      >
                        {"Loss"}
                      </Typography>
                      <Typography
                        component={"div"}
                        variant={"p"}
                        sx={{ fontWeight: "600" }}
                      >
                        {"Risk Reward"}
                      </Typography>
                    </Box>
                    {selectedCells.map((cell) => {
                      return (
                        <Card
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            my: "2em",
                            py: "1em",
                            px: ".5em",
                            justifyContent: "space-between",
                            width: "95%",
                          }}
                        >
                          <Avatar>
                            <Tooltip title="delete">
                              <DeleteOutline
                                onClick={(e) => handleDeleteOne(e, cell)}
                                fontSize="small"
                                sx={{ ":hover": { cursor: "pointer" } }}
                              />
                            </Tooltip>
                          </Avatar>
                          <Typography component={"div"} variant={"p"}>
                            {cell.trade_name}
                          </Typography>
                          <Typography
                            component={"div"}
                            variant={"p"}
                            // sx={{ ml: "em" }}
                          >
                            {
                              cell.trade_history[cell.trade_history.length - 1]
                                .profit
                            }
                          </Typography>
                          <Typography
                            component={"div"}
                            variant={"p"}
                            // sx={{ ml: "1em" }}
                          >
                            {
                              cell.trade_history[cell.trade_history.length - 1]
                                .loss
                            }
                          </Typography>
                          <Typography
                            component={"div"}
                            variant={"p"}
                            // sx={{ ml: "1em" }}
                          >
                            {cell.risk_reward}
                          </Typography>
                        </Card>
                      );
                    })}
                  </Box>{" "}
                </>
              ) : (
                <>
                  <Typography
                    component={"div"}
                    variant={"p"}
                    sx={{ textAlign: "center", my: "2em", fontSize: "1.5rem" }}
                  >
                    No Selected Cells to Delete 🐸
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img width={"50%"} src={NoDataPng} alt="no-data" />
                  </Box>
                </>
              )}
            </>
          </Dialog>
        </Box>
      </Box>
    </>
  );
};

export default SpeedDial;

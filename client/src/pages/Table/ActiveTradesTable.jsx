import { useCallback, useState } from "react";

import { Box, Chip, DialogTitle, Divider } from "../../constants/muiConstants";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Typography from "../../components/Typography/Typography";
import { getSelectedRowsToExport } from "../../utils/selectecRows";
import { dateFormat } from "../../utils/dateFormat";
import useTable from "../../hooks/useTable";
import useRequest from "../../hooks/useRequest";
import Dialog from "../../components/Dialog/Dialog";
import SpeedDial from "../../components/SpeedDial/SpeedDial";
import useDialog from "../../hooks/useDialog";
import Form from "./Form";
import useSpeedDial from "../../hooks/useSpeedDial";

const columns = [
  {
    field: "trade_name",
    headerName: "Trade Name",
    width: 100,
    editable: true,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {param?.row?.trade_name || "null"}
          </Typography>
        </>
      );
    },
  },
  {
    field: "profit",
    headerName: "Profit",
    width: 100,
    editable: true,
    disableExport: false,
    renderCell: (param) => {
      return (
        <Typography component={"span"} variant={"p"} sx={{ mr: ".5em" }}>
          {parseFloat(param?.row?.profit).toFixed(2)}
        </Typography>
      );
    },
  },
  {
    field: "loss",
    headerName: "Loss",
    width: 100,
    editable: true,
    disableExport: false,
    renderCell: (param) => {
      return (
        <Typography component={"span"} variant={"p"} sx={{ mr: ".5em" }}>
          {parseFloat(param?.row?.loss).toFixed(2)}
        </Typography>
      );
    },
  },
  {
    field: "result",
    headerName: "Result",
    width: 100,
    editable: true,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {param?.row?.result || "null"}
          </Typography>
        </>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    editable: true,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {param?.row?.status}
          </Typography>
        </>
      );
    },
  },
  {
    field: "direction",
    headerName: "Direction",
    width: 100,
    editable: true,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {param?.row?.direction}
          </Typography>
        </>
      );
    },
  },
  {
    field: "risk_reward",
    headerName: "Risk Reward",
    disableExport: true,
    width: 100,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {parseFloat(param?.row?.risk_reward).toFixed(2) || "null"}
          </Typography>
        </>
      );
    },
  },

  {
    field: "createdAt",
    headerName: "Date Added",
    width: 100,
    editable: false,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {dateFormat(param?.row?.createdAt)}
          </Typography>
        </>
      );
    },
  },
  {
    field: "updatedAt",
    headerName: "Last updated",
    width: 100,
    editable: false,
    disableExport: false,
    renderCell: (param) => {
      return (
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {dateFormat(param?.row?.updatedAt)}
          </Typography>
        </>
      );
    },
  },
];

const ActionsJsx = ({
  selectedCells,
  direction,
  hidden,
  setSelectedCells,
  handleDialogOpen,
  handleSpeedDialShow,
  handleSpeedDialHide,
  toggleCheckBox,
  isDialogOpen,
  handleDialogClose,
}) => {
  return (
    <>
      <SpeedDial
        direction={direction}
        hidden={hidden}
        selectedCells={selectedCells}
        setSelectedCells={setSelectedCells}
        handleDialogOpen={handleDialogOpen}
        toggleCheckBox={toggleCheckBox}
        open={isDialogOpen}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
};

const ActiveTrdesTable = () => {
  const [activeTradeFormOpen, setActiveTradeFormOpen] = useState(false);
  const [SpeedDialOpen, setSpeedDialOpen] = useState(false);

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleActiveTradeFormOpen = () => {
    setActiveTradeFormOpen(true);
  };

  const handleActiveTradeFormClose = () => {
    setActiveTradeFormOpen(false);
  };

  const { useGet, usePost } = useRequest();

  const { open, handleClose, handleOpen } = useDialog();
  const { direction, handleSpeedDialHide, handleSpeedDialShow, hidden } =
    useSpeedDial();

  const {
    selectedCells,
    setSelectedCells,
    row,
    setRow,
    processRowUpdate,
    renderConfirmDialog,
    showCheckboxes,
    toggleCheckBox,
  } = useTable();

  const {
    data: rows,
    isLoading: rowsLoading,
    error: rowsError,
  } = useGet("trade/running", ["running-trades"]);

  const handleRowModeChange = useCallback(
    (params) => {
      const copyRowData = [
        ...rows?.data?.map((row) => ({ ...row, id: row._id })),
      ];
      const selectedRows = copyRowData.filter((row) => params.includes(row.id));
      setSelectedCells(selectedRows);
    },
    [selectedCells, rows?.data]
  );

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  return (
    <>
      {row && (
        <Dialog
          open={open}
          handleClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
          fullScreen={false}
        >
          <DialogTitle>
            update entries for {row?.trade_name.toLowerCase()}
          </DialogTitle>
          <Divider />
          <Form
            row={row}
            handleClose={handleClose}
            queryValue="running-trades"
          />
        </Dialog>
      )}
      <Typography component={"div"} variant={"p"} sx={{ fontSize: "2.5rem" }}>
        Active Trades
      </Typography>
      {rows && (
        <Typography
          component={"div"}
          variant={"p"}
          sx={{ fontSize: "1.5rem", mt: "1em" }}
        >
          Total Active Trades:{rows?.data?.length}
        </Typography>
      )}
      <Box sx={{ mt: "1em" }}>
        <ActionsJsx
          direction={direction}
          handleDialogOpen={handleSpeedDialOpen}
          handleDialogClose={handleSpeedDialClose}
          isDialogOpen={SpeedDialOpen}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          hidden={hidden}
          handleSpeedDialShow={handleSpeedDialShow}
          handleSpeedDialHide={handleSpeedDialHide}
          toggleCheckBox={toggleCheckBox}
        />
      </Box>
      {renderConfirmDialog()}
      <Box sx={{ my: "2em" }}>
        <DataGrid
          loading={rowsLoading}
          autoHeight
          density="comfortable"
          checkboxSelection={showCheckboxes}
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          rows={
            !rows
              ? []
              : rows?.data?.map((row) => ({
                  ...row,
                  id: row._id,
                  profit:
                    row?.trade_history[row?.trade_history?.length - 1].profit,
                  loss: row?.trade_history[row?.trade_history?.length - 1].loss,
                }))
          }
          filterDebounceMs={300}
          columns={[...columns]}
          processRowUpdate={processRowUpdate}
          onRowClick={(cel) => {
            handleOpen();
            setRow(cel.row);
          }}
          onRowSelectionModelChange={handleRowModeChange}
          disableRowSelectionOnClick={true}
          rowCount={!rows ? 0 : rows.length}
          getRowSpacing={getRowSpacing}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              printOptions: {
                getRowsToExport: getSelectedRowsToExport,
                hideToolbar: true,
              },
              csvOptions: { allColumns: true },
            },
          }}
        />
      </Box>
    </>
  );
};

export default ActiveTrdesTable;

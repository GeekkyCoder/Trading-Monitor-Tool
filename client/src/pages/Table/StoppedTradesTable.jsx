import { useCallback, useState } from "react";

import { Box, DialogTitle, Divider } from "../../constants/muiConstants";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import Typography from "../../components/Typography/Typography";
import { getSelectedRowsToExport } from "../../utils/selectecRows";
import { dateFormat } from "../../utils/dateFormat";
import useTable from "../../hooks/useTable";
import useRequest from "../../hooks/useRequest";
import useDialog from "../../hooks/useDialog";
import Dialog from "../../components/Dialog/Dialog";
import SpeedDial from "../../components/SpeedDial/SpeedDial";
import useSpeedDial from "../../hooks/useSpeedDial";
import Form from "./Form";

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
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {param.row?.profit}
          </Typography>
        </>
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
        <>
          <Typography
            component={"div"}
            variant="p"
            sx={{
              fontWeight: "300",
            }}
          >
            {param?.row?.loss}
          </Typography>
        </>
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
            {param?.row?.risk_reward || "null"}
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
  handleDialogClose,
  isDialogOpen,
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

const StoppedTradesTable = () => {
  const [SpeedDialOpen, setSpeedDialOpen] = useState(false);

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const { useGet, usePost } = useRequest();

  const { handleClose, handleOpen, open } = useDialog();
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
  } = useGet("trade/stopped", ["stopped-trades"]);

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
            handleClose={handleClose}
            row={row}
            queryValue={"stopped-trades"}
          />
        </Dialog>
      )}

      <Typography component={"div"} variant={"p"} sx={{ fontSize: "2.5rem" }}>
        Stopped Trades
      </Typography>
      {rows && (
        <Typography
          component={"div"}
          variant={"p"}
          sx={{ fontSize: "1.5rem", mt: "1em" }}
        >
          Total Stopped Trades:{rows?.data?.length}
        </Typography>
      )}
      <Box sx={{ mt: "1em" }}>
        <ActionsJsx
          direction={direction}
          handleDialogOpen={handleSpeedDialOpen}
          isDialogOpen={SpeedDialOpen}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          hidden={hidden}
          handleSpeedDialShow={handleSpeedDialShow}
          handleSpeedDialHide={handleSpeedDialHide}
          toggleCheckBox={toggleCheckBox}
          handleDialogClose={handleSpeedDialClose}
        />
      </Box>

      {renderConfirmDialog()}
      <Box sx={{ my: "2em" }}>
        <DataGrid
          loading={rowsLoading}
          autoHeight
          density="comfortable"
          checkboxSelection={showCheckboxes}
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
          getRowSpacing={getRowSpacing}
          onRowSelectionModelChange={handleRowModeChange}
          disableRowSelectionOnClick
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
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

export default StoppedTradesTable;
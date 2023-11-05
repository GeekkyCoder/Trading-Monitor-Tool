import {
    gridFilteredSortedRowIdsSelector,
    selectedGridRowsSelector,
  } from "@mui/x-data-grid";
  
  export const getSelectedRowsToExport = ({ apiRef }) => {
    const selectedRowIds = selectedGridRowsSelector(apiRef);
    if (selectedRowIds.size > 0) {
      return Array.from(selectedRowIds.keys());
    }
  
    return gridFilteredSortedRowIdsSelector(apiRef);
  };
  
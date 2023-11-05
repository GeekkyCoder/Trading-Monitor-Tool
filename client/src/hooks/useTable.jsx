import { useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "../constants/muiConstants";
import Button from "../components/Button/Button";

const useTable = () => {
  const noButtonRef = useRef(null);
  const [promiseArguments, setPromiseArguments] = useState(undefined);
  const [selectedCells, setSelectedCells] = useState([]);
  const [row, setRow] = useState(null);
  const [showCheckboxes, setShowCheckBoxes] = useState(false);


  
  const toggleCheckBox = () => {
    setShowCheckBoxes((prevState) => !prevState);
  };

  function computeMutation(newRow, oldRow) {
    for (const key in newRow) {
      if (newRow[key] !== oldRow[key]) {
        return `${key}' from ${oldRow[key] || ""} to ${newRow[key] || ""}`;
      }
    }
    return null;
  }

  const updateRow = (newRow) => {
    console.log(newRow);
  };

  const processRowUpdate = useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = useCallback(() => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button
            onClickHandler={handleNo}
            fullWidth={false}
            variant={"contained"}
            type={"button"}
            ref={noButtonRef}
          >
            No
          </Button>
          <Button
            fullWidth={false}
            variant={"contained"}
            type={"button"}
            onClickHandler={handleYes}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }, [promiseArguments]);

  const handleNo = useCallback(() => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  }, [promiseArguments]);

  const handleYes = useCallback(async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      const response = await updateRow(newRow);
      resolve(response);
      setPromiseArguments(null);
      //   snackbarActions("Row Updated Successfully", "success", true);
    } catch (error) {
      reject(oldRow);
      setPromiseArguments(null);
      //   snackbarActions("Row Update Failed", "error", true);
    }
  }, [promiseArguments]);

  return {
    noButtonRef,
    promiseArguments,
    selectedCells,
    setSelectedCells,
    row,
    processRowUpdate,
    renderConfirmDialog,
    handleNo,
    handleYes,
    setRow,
    showCheckboxes,
    toggleCheckBox
  };
};

export default useTable;

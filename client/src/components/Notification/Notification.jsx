import { Snackbar, Alert } from "../../constants/muiConstants";

const Notification = ({
  snackbarOpen,
  snackbarMessage,
  alertSeverity,
  handleSnackbarClose,
}) => {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={alertSeverity}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default Notification;

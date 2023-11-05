import { CloseOutlined } from "@mui/icons-material";
import { Dialog as MuiDialog, Box } from "../../constants/muiConstants";

const Dialog = ({
  children,
  open,
  handleClose,
  fullWidth,
  fullScreen,
  maxWidth,
}) => {
  return (
    <MuiDialog
      open={open}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      scroll="body"
      
    >
      <Box sx={{ p: "2em" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            ml: "auto",
          }}
        >
          <CloseOutlined onClick={handleClose} />
        </Box>

        {children}
      </Box>
    </MuiDialog>
  );
};

export default Dialog;

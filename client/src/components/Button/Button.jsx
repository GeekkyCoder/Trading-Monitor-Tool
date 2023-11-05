// import { Button as MuiButton } from "../../constants/muiConstants";

import LoadingButton from "@mui/lab/LoadingButton";

function Button({
  variant,
  children,
  type,
  fullWidth,
  onClickHandler,
  icon,
  sx,
  loading,
}) {
  return (
    <>
      {type === "button" ? (
        <LoadingButton
          fullWidth={fullWidth}
          type={type}
          variant={variant}
          onClick={onClickHandler}
          sx={sx}
          loading={loading}
          startIcon={icon}
          loadingPosition="center"
        >
          {children}
        </LoadingButton>
      ) : (
        <LoadingButton
          fullWidth={fullWidth}
          variant={variant}
          type={type}
          sx={sx}
          loading={loading}
          startIcon={icon}
          loadingPosition="center"
        >
          {children} 🚀
        </LoadingButton>
      )}
    </>
  );
}

export default Button;

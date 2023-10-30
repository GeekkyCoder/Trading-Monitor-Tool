import { TextField } from "@mui/material";

function Input({ label, error, helperText, type,other }) {
  return (
    <TextField
      type={type}
      label={label}
      fullWidth
      error={error}
      helperText={helperText}
      other={other}
    ></TextField>
  );
}

export default Input;

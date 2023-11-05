import { InputLabel, TextField } from "../../constants/muiConstants";

// import { TextField } from "@material-ui/core";

import { Controller } from "react-hook-form";

function ControlInput({
  name,
  error,
  helperText,
  type,
  control,
  readOnly,
  disabled,
}) {
  return (
    <>
      <InputLabel shrink htmlFor={name}>
        {name.toUpperCase()}
      </InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            {...field}
            name={name}
            type={type}
            variant="outlined"
            error={error}
            helperText={helperText}
            readOnly={readOnly}
            disabled={disabled}
          />
        )}
      />
    </>
  );
}

export default ControlInput;

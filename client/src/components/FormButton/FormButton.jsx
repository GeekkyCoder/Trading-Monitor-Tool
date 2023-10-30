import { Button as MuiButton } from "../../constants/muiConstants";

function FormButton({ variant, children, type }) {
  return (
    <MuiButton type={type} variant={variant} fullWidth>
      {children}
    </MuiButton>
  );
}

export default FormButton;

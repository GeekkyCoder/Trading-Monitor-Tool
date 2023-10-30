import {Typography as MuiTypography} from "../../constants/muiConstants"

function Typography({variant,component,sx,children}) {
  return (
    <MuiTypography component={component} variant={variant} sx={sx}>{children}</MuiTypography>
  )
}

export default Typography
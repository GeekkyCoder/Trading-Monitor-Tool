import {Box} from "../../constants/muiConstants"
import Login from "./Login"

function Auth() {
  return (
    <Box sx={{
      height:"100vh",
      backgroundImage:'url("./Animated Shape.svg")',
      backgroundSize:"cover",
      backgroundPosition:"center",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }}>

      <Login/>
    </Box>
  )
}

export default Auth
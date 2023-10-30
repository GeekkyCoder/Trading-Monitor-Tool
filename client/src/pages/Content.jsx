import { green,red } from "@mui/material/colors"
import { styled,Box,Card,Avatar, Typography } from "../constants/muiConstants"

import AssignmentIcon from '@mui/icons-material/Assignment';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import SentimentDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentDissatisfiedOutlined';

const Grid = styled(Box)(({theme}) => ({
    display:"grid",
    gridTemplateColumns:"repeat(3,1fr)",
    gridAutoRows: "minmax(200px,auto)",
    gridGap: "10px"
}))


const StyledCard = styled(Box)(({theme}) => ({
    height:"100%",
    position:"relative",
}))



function Content() {
  return (
    <>
     <Grid>
      

       <Box>
        <Box sx={{position:"relative",height:"100%"}}>
             <Box sx={{position:"absolute",top:"-10%",left:"5%"}}>
                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                <TagFacesOutlinedIcon/>
                </Avatar>
            </Box>
            <Card sx={{height:"100%",pt:"2em",textAlign:"center",fontSize:"2rem"}}>
                Gain
            </Card>
            </Box>
       </Box>

       <Box>
        <Box sx={{position:"relative",height:"100%"}}>
             <Box sx={{position:"absolute",top:"-10%",left:"5%"}}>
                <Avatar sx={{ bgcolor: red[500] }} variant="rounded">
                <SentimentDissatisfiedOutlinedIcon/>
                </Avatar>
            </Box>
            <Card sx={{height:"100%",pt:"2em",textAlign:"center",fontSize:"2rem"}}>
                Loss
            </Card>
            </Box>
       </Box>

       <Box>
        <Box sx={{position:"relative",height:"100%"}}>
             <Box sx={{position:"absolute",top:"-10%",left:"5%"}}>
                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                <AssignmentIcon/>
                </Avatar>
            </Box>
            <Card sx={{height:"100%",pt:"2em",textAlign:"center",fontSize:"2rem"}}>
                Profit
            </Card>
            </Box>
       </Box>

     </Grid>
    </>
  )
}

export default Content
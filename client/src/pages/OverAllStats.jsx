import { green, red } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import Typography from "../components/Typography/Typography";

import { Box, Card, Avatar, Skeleton } from "../constants/muiConstants";

const OverAllStats = ({
  overAllStats,
  overAllStatsLoading,
  overAllStatsError,
}) => {
  return (
    <>
      {!overAllStatsLoading ? (
        <Box>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box sx={{ position: "absolute", top: "-10%", left: "5%" }}>
              <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                <AssignmentIcon />
              </Avatar>
            </Box>
            <Card
              sx={{
                height: "100%",
                pt: "4em",
                textAlign: "center",
              }}
            >
              <Typography
                component={"div"}
                variant={"p"}
                sx={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                Profit
                <Typography
                  component={"div"}
                  variant={"p"}
                  sx={{
                    fontSize: "inherit",
                    fontWeight: "800",
                    color: green["800"],
                    mt: ".5em",
                  }}
                >
                  {overAllStats?.data[0]?.total_profit}
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {!overAllStatsLoading ? (
        <Box>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box sx={{ position: "absolute", top: "-10%", left: "5%" }}>
              <Avatar sx={{ bgcolor: red[500] }} variant="rounded">
                <SentimentDissatisfiedOutlinedIcon />
              </Avatar>
            </Box>
            <Card
              sx={{
                height: "100%",
                pt: "2em",
                textAlign: "center",
                fontSize: "2rem",
              }}
            >
              <Typography
                component={"div"}
                variant={"p"}
                sx={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                Loss
                <Typography
                  component={"div"}
                  variant={"p"}
                  sx={{
                    fontSize: "inherit",
                    fontWeight: "800",
                    color: red["A700"],
                    mt: ".5em",
                  }}
                >
                  {overAllStats?.data[0]?.total_loss}
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {!overAllStatsLoading ? (
        <Box>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box sx={{ position: "absolute", top: "-10%", left: "5%" }}>
              <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                <TagFacesOutlinedIcon />
              </Avatar>
            </Box>
            <Card
              sx={{
                height: "100%",
                pt: "2em",
                textAlign: "center",
                fontSize: "2rem",
              }}
            >
              <Typography
                component={"div"}
                variant={"p"}
                sx={{ fontSize: "1.5rem", fontWeight: 600 }}
              >
                Gain
                <Typography
                  component={"div"}
                  variant={"p"}
                  sx={{
                    fontSize: "inherit",
                    fontWeight: "800",
                    color: green["800"],
                    mt: ".5em",
                  }}
                >
                  +{" "}
                  {overAllStats?.data[0]?.total_profit -
                    overAllStats?.data[0]?.total_loss}
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}
    </>
  );
};

export default OverAllStats;

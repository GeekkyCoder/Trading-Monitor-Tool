import { green, red } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import Typography from "../components/Typography/Typography";

import { Box, Card, Avatar, Skeleton } from "../constants/muiConstants";

const WeeklyStats = ({ weeklyStats, weeklyStatsError, weeklyStatsLoading }) => {
  return (
    <>
      {!weeklyStatsLoading ? (
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
                  {weeklyStats?.data[0]?.total_profit
                    ? weeklyStats?.data[0]?.total_profit
                    : parseFloat("0.00")}
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {!weeklyStatsLoading ? (
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
                  {weeklyStats?.data[0]?.total_loss ? weeklyStats?.data[0]?.total_loss : parseFloat("0.00") }
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {!weeklyStatsLoading ? (
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
                  {weeklyStats?.data[0]?.total_profit &&
                    weeklyStats?.data[0]?.total_loss ? weeklyStats?.data[0]?.total_profit -
                    weeklyStats?.data[0]?.total_loss : parseFloat("0.00") }
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

export default WeeklyStats;

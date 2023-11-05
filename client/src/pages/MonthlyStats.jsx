import AssignmentIcon from "@mui/icons-material/Assignment";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import Typography from "../components/Typography/Typography";

import { useTheme } from "@mui/material";

import { Box, Card, Avatar, Skeleton } from "../constants/muiConstants";

const MonthlyStats = ({
  monthlyStats,
  monthlyStatsLoading,
  monthlyStatsError,
}) => {
  const { theme } = useTheme();

  return (
    <>
      {!monthlyStatsLoading ? (
        <Box>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box sx={{ position: "absolute", top: "-10%", left: "5%" }}>
              <Avatar
                sx={{ bgcolor: theme?.palette?.primary?.main }}
                variant="rounded"
              >
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
                    color: theme?.palette?.primary?.main,
                    mt: ".5em",
                  }}
                >
                  {monthlyStats?.data[0]?.total_profit
                    ? parseFloat(monthlyStats?.data[0]?.total_profit).toFixed(2)
                    : parseFloat("0.00")}
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {!monthlyStatsLoading ? (
        <Box>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box sx={{ position: "absolute", top: "-10%", left: "5%" }}>
              <Avatar
                sx={{ bgcolor: theme?.palette?.primary?.main }}
                variant="rounded"
              >
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
                    color: theme?.palette?.primary?.main,
                    mt: ".5em",
                  }}
                >
                  {monthlyStats?.data[0]?.total_loss
                    ? parseFloat(monthlyStats?.data[0]?.total_loss).toFixed(2)
                    : parseFloat("0.00")}
                </Typography>
              </Typography>
            </Card>
          </Box>
        </Box>
      ) : (
        <Skeleton variant="rectangular" width={300} height={300} />
      )}

      {!monthlyStatsLoading ? (
        <Box>
          <Box sx={{ position: "relative", height: "100%" }}>
            <Box sx={{ position: "absolute", top: "-10%", left: "5%" }}>
              <Avatar
                sx={{ bgcolor: theme?.palette?.primary?.main }}
                variant="rounded"
              >
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
                    color: theme?.palette?.primary?.main,
                    mt: ".5em",
                  }}
                >
                  {monthlyStats?.data[0]?.total_profit -
                    monthlyStats?.data[0]?.total_loss >
                  0
                    ? "+"
                    : ""}
                  {monthlyStats?.data[0]?.total_profit &&
                  monthlyStats?.data[0]?.total_loss
                    ? monthlyStats?.data[0]?.total_profit -
                        monthlyStats?.data[0]?.total_loss <
                      0
                      ? parseFloat(
                          monthlyStats?.data[0]?.total_profit -
                            monthlyStats?.data[0]?.total_loss
                        ).toFixed(2)
                      : parseFloat(
                          monthlyStats?.data[0]?.total_profit -
                            monthlyStats?.data[0]?.total_loss
                        ).toFixed(2)
                    : parseFloat("0.00")}
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

export default MonthlyStats;

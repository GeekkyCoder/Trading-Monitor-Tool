import AssignmentIcon from "@mui/icons-material/Assignment";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import Typography from "../components/Typography/Typography";

import { Box, Card, Avatar, Skeleton } from "../constants/muiConstants";

import { useTheme } from "@mui/material";

const OverAllStats = ({
  overAllStats,
  overAllStatsLoading,
  overAllStatsError,
}) => {
  const { theme } = useTheme();

  return (
    <>
      {!overAllStatsLoading ? (
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
                backgroundColor: theme?.palette?.primary?.main,
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
                  {parseFloat(overAllStats?.data[0]?.total_profit).toFixed(2)}
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
                  {parseFloat(overAllStats?.data[0]?.total_loss).toFixed(2)}
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
                  +{" "}
                  {overAllStats?.data[0]?.total_profit -
                    overAllStats?.data[0]?.total_loss <
                  0
                    ? "0.00"
                    : parseFloat(
                        overAllStats?.data[0]?.total_profit -
                          overAllStats?.data[0]?.total_loss
                      ).toFixed(2)}
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

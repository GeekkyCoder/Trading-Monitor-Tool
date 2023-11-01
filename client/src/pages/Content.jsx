import Typography from "../components/Typography/Typography";
import { styled, Box, Card, Avatar, Skeleton } from "../constants/muiConstants";

import useRequest from "../hooks/useRequest";
import { dateFormat } from "../utils/dateFormat";
import MonthlyStats from "./MonthlyStats";
import OverAllStats from "./OverAllStats";
import WeeklyStats from "./WeeklyStats";

const Grid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridAutoRows: "minmax(200px,auto)",
  gridGap: "10px",
}));

function Content() {
  const { useGet } = useRequest();

  const {
    data: overAllStats,
    isLoading: overAllStatsLoading,
    error: overAllStatsError,
  } = useGet("trade/overall-stats", ["overall-trade-reports"]);

  const {
    data: weeklyStats,
    isLoading: weeklyStatsLoading,
    error: weeklyStatsError,
  } = useGet("trade/weekly-summary", ["weekly-trade-reports"]);

  const {data:monthlyStats,isLoading:monthlyStatsLoading,error:monthlyStatsError} = useGet("trade/monthly-summary",["monthly-trade-reports"])

  console.log(monthlyStats)

  return (
    <>
      <Box>
        <Typography
          component={"div"}
          variant={"p"}
          sx={{
            fontSize: "2rem",
            letterSpacing: "1px",
            fontWeight: 300,
            my: "1em",
          }}
        >
          OverAll Stats
        </Typography>
        <Grid>
          <OverAllStats
            overAllStats={overAllStats}
            overAllStatsError={overAllStatsError}
            overAllStatsLoading={overAllStatsLoading}
          />
        </Grid>
      </Box>

      <Box sx={{ my: "4em" }}>
        <Typography
          component={"div"}
          variant={"p"}
          sx={{
            fontSize: "2rem",
            letterSpacing: "1px",
            fontWeight: 300,
            my: "1em",
          }}
        >
          Weekly Stats
          {weeklyStats ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component={"span"}
                variant={"p"}
                sx={{ fontSize: "1rem", mr: ".5em" }}
              >
                {dateFormat(weeklyStats?.date?.currentWeekStart)}
              </Typography>
              <Box component={"span"} sx={{ fontSize: "1rem" }}>
                -
              </Box>
              <Typography
                component={"span"}
                variant={"p"}
                sx={{ fontSize: "1rem", ml: ".5em" }}
              >
                {dateFormat(weeklyStats?.date?.upcomingWeekStart)}
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" />
          )}
        </Typography>
        <Grid>
          <WeeklyStats
            weeklyStats={weeklyStats}
            weeklyStatsError={weeklyStatsError}
            weeklyStatsLoading={weeklyStatsLoading}
          />
        </Grid>
      </Box>

      <Box sx={{ my: "4em" }}>
        <Typography
          component={"div"}
          variant={"p"}
          sx={{
            fontSize: "2rem",
            letterSpacing: "1px",
            fontWeight: 300,
            my: "1em",
          }}
        >
          Monthly Stats
          {monthlyStats ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                component={"span"}
                variant={"p"}
                sx={{ fontSize: "1rem", mr: ".5em" }}
              >
                {dateFormat(monthlyStats?.date?.currentMonthStart)}
              </Typography>
              <Box component={"span"} sx={{ fontSize: "1rem" }}>
                -
              </Box>
              <Typography
                component={"span"}
                variant={"p"}
                sx={{ fontSize: "1rem", ml: ".5em" }}
              >
                {dateFormat(monthlyStats?.date?.upcomingMonthStart)}
              </Typography>
            </Box>
          ) : (
            <Skeleton variant="text" />
          )}
        </Typography>
        <Grid>
          <MonthlyStats
            monthlyStats={monthlyStats}
            monthlyStatsError={monthlyStatsError}
            monthlyStatsLoading={monthlyStatsLoading}
          />
        </Grid>
      </Box>
    </>
  );
}

export default Content;

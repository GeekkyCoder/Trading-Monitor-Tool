import { useEffect, useState } from "react";
import Typography from "../components/Typography/Typography";
import { Box, Skeleton } from "../constants/muiConstants";

import NotAuthroizedIcon from "../images/not-authorized.png";

const UnAuthorized = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box sx={{ width: "500px" }}>
          {!loading ? (
            <img width={"100%"} src={NotAuthroizedIcon} alt="not-authorized" />
          ) : (
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={500}
              height={300}
            />
          )}
          <Typography
            component={"div"}
            variant={"h3"}
            sx={{
              fontSize: "1.5rem",
              fontFamily: "inherit",
              my: "1em",
              textAlign: "center",
            }}
          >
            {!loading ? (
              "You are not authroized to access/use this website"
            ) : (
              <Skeleton />
            )}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UnAuthorized;

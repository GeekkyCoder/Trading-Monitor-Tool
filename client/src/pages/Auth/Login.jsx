import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Box, Card, TextField } from "../../constants/muiConstants";
// import * as yup from "yup";

import { blueGrey } from "@mui/material/colors";
import Typography from "../../components/Typography/Typography";
import FormButton from "../../components/FormButton/FormButton";
import { AuthContext } from "../../components/context/authContext";
import Notification from "../../components/Notification/Notification";
import useSnackbar from "../../hooks/useSnackBar";
import { useNavigate } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
// import { yupResolver } from "@hookform/resolvers/yup";

// const loginFormSchema = yup.object().shape({
//   userName: yup.string().required("User Name is required"),
// });

function Login() {
  const { usePost } = useRequest();

  const {
    mutateAsync,
    isError: registerError,
    isSuccess: registerSuccess,
    isLoading: registerLoading,
  } = usePost("user/login", "login");

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    alertSeverity,
    handleSnackbarClose,
    snackbarActions,
    snackbarMessage,
    snackbarOpen,
  } = useSnackbar();
  const form = useForm({
    defaultValues: {
      userName: "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    try {
      const user = await mutateAsync(data);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      snackbarActions(
        `mubarak beezhe ${user?.data?.userName}`,
        "success",
        true
      );
      navigate("/");
    } catch (err) {
      console.log(err);
      snackbarActions(`dobara koshish khan`, "error", true);
    }

    reset(data);
  };

  return (
    <>
      <Notification
        snackbarMessage={snackbarMessage}
        snackbarOpen={snackbarOpen}
        handleSnackbarClose={handleSnackbarClose}
        alertSeverity={alertSeverity}
      />
      <Box sx={{ maxWidth: 400, width: "50%" }}>
        <Card sx={{ height: "100%", p: "2em" }}>
          <Typography
            component={"div"}
            variant={"p"}
            sx={{
              fontSize: "1.5rem",
              color: blueGrey["A700"],
              textAlign: "center",
            }}
          >
            Welcome, Login Here
          </Typography>

          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              sx={{ my: "2em" }}
              fullWidth
              error={!!errors.userName}
              helperText={errors?.userName?.message}
              label={"User Name"}
              type="text"
              {...register("userName", {
                required: "uzi user name makhin ehinda",
              })}
            ></TextField>
            <FormButton type={"submit"} fullWidth variant="contained">
              {registerLoading ? "loading..." : "login"}
            </FormButton>
            {registerError && (
              <Typography
                component={"div"}
                variant={"p"}
                sx={{ color: "red", my: "1em", textAlign: "center" }}
              >
                wazzi naam phajiya login bee
              </Typography>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
}

export default Login;

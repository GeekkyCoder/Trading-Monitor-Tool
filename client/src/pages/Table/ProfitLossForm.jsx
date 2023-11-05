import { SendOutlined } from "@mui/icons-material";
import Button from "../../components/Button/Button";
import ControlInput from "../../components/ControlInput/ControlInput";
import Typography from "../../components/Typography/Typography";
import { Box } from "../../constants/muiConstants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useRequest from "../../hooks/useRequest";

const tradeSchema = yup.object().shape({
  profit: yup.number().required("provide a number here"),
  loss: yup.number().required("provide a number here"),
});

function ProfitLossForm({ profit, loss, name, row, handleClose }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      profit,
      loss,
    },
    resolver: yupResolver(tradeSchema),
  });

  const { mutateAsync } = useRequest().usePost(
    `trade/update-summary?id=${row.id}`,
    ["running-trades", "stopped-trades"]
  );

  const onSubmit = async (data) => {
    try {
      const trade = await mutateAsync(data);
      handleClose();
      console.log(trade);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box my={"2em"}>
        <Typography
          component={"div"}
          variant={"p"}
          sx={{ textAlign: "center", fontSize: "1.5rem" }}
        >
          Update Profit and Loss for {name}
        </Typography>
        <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box my={"2em"}>
              <ControlInput
                control={control}
                error={!!errors?.profit}
                helperText={errors?.profit ? errors?.profit.message : ""}
                type={"text"}
                name={"profit"}
              />
            </Box>

            <ControlInput
              control={control}
              error={!!errors?.loss}
              helperText={errors?.loss ? errors?.loss.message : ""}
              type={"text"}
              name={"loss"}
            />

            <Button
              variant={"contained"}
              fullWidth={false}
              loading={false}
              type={"submit"}
              sx={{ width: "40%", display: "block", mx: "auto", mt: "2em" }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProfitLossForm;

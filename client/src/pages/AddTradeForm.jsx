import { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import ControlInput from "../components/ControlInput/ControlInput";

import { Box, Card } from "../constants/muiConstants";
import Button from "../components/Button/Button";
import useRequest from "../hooks/useRequest";
import Typography from "../components/Typography/Typography";

const defaultTradeFormData = {
  trade_name: "",
  result: "unknown",
  status: "running",
  risk_reward: "0.00",
  direction: "unknown",
};

const tradeSchema = yup.object().shape({
  trade_name: yup
    .string()
    .required("baz hoshiyar nah bi thao ni, hashiya phur khan"),
});

function AddTradeForm({ handleClose }) {
  const [formLoading, setFormLoading] = useState(false);

  const { mutateAsync } = useRequest().usePost("trade/add", ["active-trades"]);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      ...defaultTradeFormData,
    },
    resolver: yupResolver(tradeSchema),
  });

  const onSubmit = async (data) => {
    try {
      const trade = await mutateAsync(data);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography
            component={"div"}
            variant={"p"}
            sx={{ fontSize: "1.5rem" }}
          >
            Default Fields:
          </Typography>
          <Typography component={"div"} variant={"p"}>
            Status:Running
          </Typography>
          <Typography component={"div"} variant={"p"}>
            Result:Unknown
          </Typography>
          <Typography component={"div"} variant={"p"}>
            Risk_Reward:Unknown
          </Typography>
          <Typography component={"div"} variant={"p"}>
            Direction:Unknown
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,auto)",
            gridAutoRows: "minmax(120,auto)",
            gap: "30px",
            columnGap: "20px",
            my: "2em",
          }}
        >
          <Box>
            <ControlInput
              name={"trade_name"}
              control={control}
              type={"text"}
              error={!!errors?.trade_name}
              helperText={errors?.trade_name ? errors?.trade_name.message : ""}
            />
          </Box>

          <Box>
            <ControlInput
              name={"status"}
              control={control}
              type={"text"}
              disabled={true}
              readOnly={true}
            />
          </Box>

          <Box>
            <ControlInput
              name={"result"}
              control={control}
              type={"text"}
              disabled={true}
              readOnly={true}
            />
          </Box>

          <Box>
            <ControlInput
              name={"risk_reward"}
              control={control}
              type={"text"}
              disabled={true}
              readOnly={true}
            />
          </Box>

          <Box>
            <ControlInput
              name={"direction"}
              control={control}
              type={"text"}
              disabled={true}
              readOnly={true}
            />
          </Box>
        </Box>
        <Button
          fullWidth={false}
          type={"submit"}
          variant={"contained"}
          sx={{ mt: "2em", mx: "auto", display: "block", width: "40%" }}
          loading={formLoading}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default AddTradeForm;

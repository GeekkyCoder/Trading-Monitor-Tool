import { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box } from "../../constants/muiConstants";

import * as yup from "yup";
import ControlInput from "../../components/ControlInput/ControlInput";
import Button from "../../components/Button/Button";
import useRequest from "../../hooks/useRequest";
import ProfitLossForm from "./ProfitLossForm";

const tradeSchema = yup.object().shape({
  trade_name: yup.string().required(),
  result: yup
    .string()
    .oneOf(
      ["win", "loss", "entry", "unknown"],
      "Invalid result. It can be win, loss,entry or unknown"
    ),
  risk_reward: yup.string().required("can be set as 0 by default"),
  status: yup
    .string()
    .required()
    .oneOf(
      ["stopped", "running"],
      "invalid entry, it can be either stopped or running"
    ),
  direction: yup
    .string()
    .required()
    .oneOf(
      ["long", "short", "unknown"],
      "invalid entry, it can be either long or short"
    ),
});

function Form({ row, handleClose, queryValue }) {
  const [formLoading, setFormLoading] = useState(false);

  const { mutateAsync } = useRequest().usePut(`trade/update?id=${row?.id}`, [
    "running-trades",
    "stopped-trades",
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm({
    defaultValues: {
      trade_name: row?.trade_name,
      result: row?.result,
      status: row?.status,
      risk_reward: row?.risk_reward,
      direction: row?.direction,
    },
    resolver: yupResolver(tradeSchema),
  });

  const onSubmit = async (data) => {
    setFormLoading(true);
    try {
      const trades = await mutateAsync(data);
      setFormLoading(false);
      handleClose();
      reset();
    } catch (err) {
      console.log(err);
      setFormLoading(false);
    }
  };

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
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
              helperText={errors?.trade_name ? errors?.trade_name?.message : ""}
              error={!!errors?.trade_name}
              type={"text"}
            />
          </Box>

          <Box>
            <ControlInput
              name={"status"}
              control={control}
              helperText={errors?.status ? errors?.status?.message : ""}
              error={!!errors?.status}
              type={"text"}
            />
          </Box>

          <Box>
            <ControlInput
              name={"result"}
              control={control}
              helperText={errors?.result ? errors?.result?.message : ""}
              error={!!errors?.result}
              type={"text"}
            />
          </Box>

          <Box>
            <ControlInput
              name={"risk_reward"}
              control={control}
              helperText={
                errors?.risk_reward ? errors?.risk_reward?.message : ""
              }
              error={!!errors?.risk_reward}
              type={"text"}
            />
          </Box>

          <Box>
            <ControlInput
              name={"direction"}
              control={control}
              helperText={errors?.direction ? errors?.direction?.message : ""}
              error={!!errors?.direction}
              type={"text"}
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
      {row && (
        <ProfitLossForm 
          handleClose={handleClose}
          row={row}
          name={row.trade_name}
          loss={row.trade_history[row.trade_history.length - 1].loss}
          profit={row.trade_history[row.trade_history.length - 1].profit}
        />
      )}
    </>
  );
}

export default Form;

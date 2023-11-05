import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Box, Typography } from "../constants/muiConstants";
import ControlInput from "../components/ControlInput/ControlInput";
import Button from "../components/Button/Button";
import useRequest from "../hooks/useRequest";

const tradeSchema = yup.object().shape({
  month: yup
    .number()
    .required()
    .oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "provide a valid month"),
  year: yup.number().required("provide a valid year"),
});

const SpecificMonthRecord = ({ setTradeData, handleClose }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      year: 2023,
      month: 11,
    },
    resolver: yupResolver(tradeSchema),
  });

  const { mutateAsync } = useRequest().usePost("trade/specific/records", [
    "specific-records",
  ]);

  const onSubmit = async (data) => {
    try {
      const trade = await mutateAsync(data);
      setTradeData(
        trade?.data?.length > 0
          ? [
              {
                ...trade.data[0],
                startMonth: trade?.startOfMonth,
                endMonth: trade?.endOfMonth,
              },
            ]
          : []
      );
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component={"div"}
          variant="p"
          sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "600" }}
        >
          Choose month and year
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box my={"2em"}>
            <ControlInput
              control={control}
              name={"month"}
              error={!!errors?.month}
              helperText={errors?.month ? errors?.month?.message : ""}
              type={"number"}
            />
          </Box>

          <ControlInput
            control={control}
            name={"year"}
            error={!!errors?.year}
            helperText={errors?.year ? errors?.year?.message : ""}
            type={"number"}
          />

          <Button
            variant={"contained"}
            type={"submit"}
            fullWidth={false}
            sx={{ my: "2em", width: "40%", display: "block", mx: "auto" }}
          >
            Show Results
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SpecificMonthRecord;

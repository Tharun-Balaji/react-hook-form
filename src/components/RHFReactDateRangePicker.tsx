
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

interface Props<T extends FieldValues> {
  name: Path<T>;
}

/**
 * A react-hook-form wrapper for MUI's DateRangePicker component.
 * It renders two date pickers, one for the start date and one for the end date.
 * The value of the component is an array of two dates, representing the start
 * and end dates of the range. If the value is not an array, the component will
 * assume the value is an array with two null values.
 * @example
 * import {RHFDateRangePicker} from "../components";
 *
 * <RHFDateRangePicker
 *   name="dates"
 * />
 *
 * This component will render two date pickers with the given name.
 * The value of the component will be an array of two dates, representing the start
 * and end dates of the range.
 */
const RHFDateRangePicker = <T extends FieldValues>({ name }: Props<T>) => {
  const { control } = useFormContext<T>();

  return (
    // LocalizationProvider is required for MUI date pickers to work with a specific date library
    // Here we're using DateFns as the date manipulation library
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* First DatePicker for the start date */}
            <DatePicker
              label="Start Date"
              value={value?.[0]}
              onChange={(newValue) => {
                onChange([newValue, value?.[1]]);
              }}
            />

            {/* Separator between date pickers */}
            <span style={{ fontSize: "1rem" }}>{"_"}</span>

            {/* Second DatePicker for the end date */}
            <DatePicker
              label="End Date"
              value={value?.[1]}
              onChange={(newValue) => {
                onChange([value?.[0], newValue]);
              }}
            />
          </Box>
        </LocalizationProvider>
      )}
    />
  );
};

export default RHFDateRangePicker;

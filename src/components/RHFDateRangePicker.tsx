import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";


/**
 * Props for the RHFDateRangePicker component.
 * @template T - The type of the form values, which extends FieldValues from react-hook-form.
 */
interface Props<T extends FieldValues> {
  /**
   * The name of the field in the form.
   * This is used to register the field with the parent form context.
   * The value of the field will be an array of two dates, representing the start
   * and end dates of the range.
   */
  name: Path<T>;
}

/**
 * A react-hook-form wrapper for @mui's DateRangePicker component.
 * The value of the component is an array of two dates, representing the start
 * and end dates of the range.
 * @example
 * import {RHFDateRangePicker} from "../components";
 *
 * <RHFDateRangePicker
 *   name="dates"
 * />
 *
 * This component will render a DateRangePicker with the given name.
 * The value of the component will be an array of two dates, representing the start
 * and end dates of the range.
 */
export default function RHFDateRangePicker<T extends FieldValues>({ name }: Props<T>)  {

  const { control } = useFormContext<T>();

  return (
    <Controller
      // The Controller component from react-hook-form is used to register the
      // DateRangePicker component with the parent form context.
      name={name}
      control={control}
      render={({ field: { value, ...restField } }) => (
        <LocalizationProvider
          // The LocalizationProvider component from @mui/x-date-pickers is used
          // to provide localization for the DateRangePicker component.
          dateAdapter={AdapterDateFns}
        >
          <DateRangePicker
            // The value of the DateRangePicker is an array of two dates, representing
            // the start and end dates of the range. The value is set to [null, null]
            // if the value is not an array.
            {...restField}
            value={Array.isArray(value) ? value : [null, null]}
          />
        </LocalizationProvider>
      )}
    />
  );

}

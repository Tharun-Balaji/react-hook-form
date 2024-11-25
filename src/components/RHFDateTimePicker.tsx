import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";


/**
 * Props for the RHFDateTimePicker component.
 *
 * @template T - The type of the form values, which extends FieldValues from react-hook-form.
 *
 * @param {Path<T>} name - The name of the field in the form.
 * @param {string} label - The label for the field.
 */
interface Props<T extends FieldValues> {

  /**
   * 'name' is a mandatory field representing the name of the field in the form
   * It is of type 'Path<T>', which is a utility type from react-hook-form
   * 'Path<T>' helps in safely referencing deeply nested properties within the form values
   */
  name: Path<T>; 
  /**
   * 'label' is a mandatory string representing the label for the component
   */
  label: string;
}

/**
 * A react-hook-form wrapper for @mui's DateTimePicker component.
 *
 * @example
 * import {RHFDateTimePicker} from "../components";
 *
 * <RHFDateTimePicker
 *   name="date"
 *   label="Date"
 * />
 *
 * This component will render a DateTimePicker with the given label.
 * The value of the component will be of type `Date`.
 */
export default function RHFDateTimePicker<T extends FieldValues>({ name, label }: Props<T>) {

    const { control } = useFormContext();

  // The Controller component from react-hook-form wraps the LocalizationProvider and DateTimePicker components
  // The LocalizationProvider component from @mui/x-date-pickers is used to provide localization for the DateTimePicker
  // The AdapterDateFns component from @mui/x-date-pickers is used to provide date manipulation logic for the DateTimePicker
  return <Controller
    name={name}
    control={control}
    render={({ field }) => <LocalizationProvider dateAdapter={AdapterDateFns}>
      {/* The DateTimePicker component from @mui/x-date-pickers is the actual component that is rendered */}
      <DateTimePicker label={label} {...field} />
    </LocalizationProvider>
    }
  />;
}

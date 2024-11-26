import { FormControlLabel, Switch } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";


/**
 * Props for the RHFSwitch component.
 * @template T - The type of the form values, which extends FieldValues from react-hook-form.
 * @param {Path<T>} name - The name of the field in the form.
 * @param {string} label - The label for the switch.
 */
interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
}
/**
 * A Switch component that uses react-hook-form to store its value in the form.
 * @template T - The type of the form values, which extends FieldValues from react-hook-form.
 * @param {{ name: Path<T>, label: string }} props - An object containing the name and label of the Switch component.
 * @returns {JSX.Element} A JSX element representing the Switch component.
 */
export default function RHFSwitch<T extends FieldValues>({ name, label }: Props<T>) {

  // Get the control object from the context provided by useFormContext
  const { control } = useFormContext();

  // The render function is called with an object containing the current value of the field,
  // as well as a function to update the value of the field.
  // We use the Switch component from MUI to render the switch.
  // We spread the field object into the Switch component to pass all the props that the Switch component needs.
  // The checked prop is set to the value of the field, which is a boolean.
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          // The control prop is set to the Switch component, which is rendered with the field object's props.
          control={<Switch {...field} checked={field.value} />}
          // The label prop is set to the label that is passed as a prop to the RHFSwitch component.
          label={label}
        />
      )}
    />
  );
}

import { Slider, Typography } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";


/**
 * Props for the RHFSlider component.
 * @template T - The type of the form values, which extends FieldValues from react-hook-form
 * @param {Path<T>} name - The name of the field in the form
 * @param {string} label - The label for the slider
 */
interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
}


/**
 * A react-hook-form wrapper for @mui's Slider component.
 * It renders a slider with the given label, and manages the form state and validation.
 * The value of the component is a number.
 * @example
 * import {RHFSlider} from "../components";
 * 
 * <RHFSlider
 *   name="age"
 *   label="Age"
 * />
 * 
 * This component will render a slider with the given label.
 * The value of the component will be a number.
 * @param {Props<T>} props - The props for the component, which include
 *   the name of the field, the label, and the control object from useFormContext.
 * @returns {JSX.Element} - The rendered component.
 */
export default function RHFSlider<T extends FieldValues>({ name, label }: Props<T>) {

  // Get the control object from the context provided by useFormContext
  const { control } = useFormContext();

  // The render function is called with an object containing the current value of the field,
  // as well as a function to update the value of the field.
  // The fieldState object contains information about the current state of the field, including any errors.
  return (
    <Controller
      // The name of the field in the form
      name={name}
      // The control object from useFormContext, which provides methods for managing the form state and validation.
      control={control}
      // The render function is called with an object containing the current value of the field and a function to update the value of the field.
      render={({ field }) => (
        <>
          {/* The label for the slider, as a Typography component from MUI. */}
          <Typography>{label}</Typography>
          {/* The Slider component from MUI, with the valueLabelDisplay prop set to "auto" so that the value of the slider is displayed above the thumb. */}
          <Slider valueLabelDisplay="auto" {...field} />
        </>
      )}
    />
  );
}

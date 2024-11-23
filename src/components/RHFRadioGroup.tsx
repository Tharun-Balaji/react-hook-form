import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/options";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";


// Define a generic type 'Props' that extends 'FieldValues' from react-hook-form
// This type will be used to specify the props for the RHFRadioGroup component

type Props<T extends FieldValues> = {
  // 'name' is a required field of type 'Path<T>', representing the name of the field in the form
  name: Path<T>;

  // 'options' is an optional array of 'Option' objects, each containing an 'id' and 'label'
  options?: Option[];

  // 'label' is a required string to display as the label for the radio group
  label: string;
};


/**
 * A react-hook-form wrapper for the MUI RadioGroup component.
 * 
 * This component renders a radio group with options passed as props.
 * It integrates with react-hook-form to manage form state and validation.
 * 
 * @template T - The type of the field values.
 * 
 * @param {Path<T>} name - The name of the field in the form.
 * @param {Option[]} [options] - The options to be rendered as radio buttons, each with an `id` and `label`.
 * @param {string} label - The label for the radio group.
 * 
 * @example
 * import { RHFRadioGroup } from "../components";
 * 
 * const options = [
 *   { id: "1", label: "Option 1" },
 *   { id: "2", label: "Option 2" },
 * ];
 * 
 * <RHFRadioGroup
 *   name="example"
 *   options={options}
 *   label="Example Label"
 * />
 * 
 * This will render a RadioGroup with the specified options and label,
 * managing the selection state through react-hook-form.
 */
export default function RHFRadioGroup<T extends FieldValues>({
  name,
  options,
  label
}: Props<T>) {

  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      // The 'render' prop is a function that takes two arguments: 'field' and 'fieldState'
      // 'field' is an object containing the current value of the field, as well as any other relevant properties
      // 'fieldState' is an object containing the current state of the field, including any errors
      render={({ field, fieldState: { error } }) => {
        // We're using the 'FormControl' component from MUI to render the radio group
        // The 'error' prop is set to true if the field has any errors
        return (
          <FormControl {...field} error={!!error}>
            {/*The 'FormLabel' component is used to render the label for the radio group*/}
            <FormLabel>{label}</FormLabel>
            {/*The 'RadioGroup' component is used to render the radio buttons*/}
            <RadioGroup>
              {/*We're mapping over the 'options' array to render each radio button*/}
              {options?.map((option) => (
                // The 'FormControlLabel' component is used to render each radio button
                // The 'value' prop is set to the 'id' of the option, and the 'control' prop is set to the 'Radio' component
                <FormControlLabel
                  value={option.id}
                  // The 'control' prop is set to a 'Radio' component with the 'checked' prop set to true if the current value of the field matches the 'id' of the option
                  // This is what makes the radio button appear as selected or not in the UI
                  control={<Radio checked={field.value === option.id} />}
                  // The 'label' prop is set to the 'label' of the option
                  label={option.label}
                  // We're setting a unique key for each option using its 'id'
                  key={option.id}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      }}
    ></Controller>
  );
}

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/options";
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, FormHelperText } from "@mui/material";

/**
 * Define a generic interface 'Props' for component props
 * @template T - The type of the form values, which extends 'FieldValues' from react-hook-form
 */
interface Props<T extends FieldValues> {
  /**
   * 'options' is an optional array of 'Option' objects
   * Each 'Option' has an 'id' and a 'label'
   */
  options?: Option[];
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
 * A react-hook-form wrapper for @mui's Checkbox component.
 * It renders a group of checkboxes with the given options.
 * The value of the component is an array of strings representing the IDs
 * of the selected options.
 * @example
 * import {RHFCheckbox} from "../components";
 * const options = [
 *   {id: "1", label: "First option"},
 *   {id: "2", label: "Second option"},
 *   {id: "3", label: "Third option"},
 * ];
 * 
 * <RHFCheckbox
 *   name="options"
 *   options={options}
 *   label="Options"
 * />
 * 
 * This component will render a group of checkboxes with the given options.
 * The value of the component will be an array of strings representing the
 * IDs of the selected options.
 * @param {Props<T>} props - The props for the component, which include
 *   the name of the field, the options, and the label.
 * @returns {JSX.Element} - The rendered component.
 */
export default function RHFCheckbox<T extends FieldValues>({
  options,
  name,
  label,
}: Props<T>) {
  
  const { control } = useFormContext<T>();
  // The 'control' is an object returned by useFormContext, which provides
  // methods for managing the form state and validation.

  // The 'render' function is called with an object containing the current
  // value of the field and a function to update the value of the field.
  // The 'fieldState' object contains information about the current state
  // of the field, including any errors.
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        // The 'value' is the current value of the field, which is an array
        // of strings representing the IDs of the selected options.
        // The 'onChange' function is called when the user selects or deselects
        // an option. It takes a new value as an argument, which is an array
        // of strings representing the IDs of the selected options.

        // The 'error' property is an object representing any errors that
        // have occurred while rendering the component. If there are errors,
        // the component will render an error message below the form field.

        // The 'FormControl' component is used to render a form control
        // with validation. It takes an 'error' prop, which is set to true
        // if there are any errors.
        return (
          <FormControl error={!!error}>
            {/* The 'FormLabel' component is used to render a label for the
            form control. */}
            <FormLabel>{label}</FormLabel>
            {/* The 'FormGroup' component is used to render a group of form
            controls. In this case, it is used to render a group of
            checkboxes. */}
            <FormGroup>
              {/* The 'options' array is iterated over and each option is rendered
              as a checkbox. The 'FormControlLabel' component is used to
              render a label for each checkbox. */}
              {options?.map((option) => (
                <FormControlLabel
                  control={
                    // The 'Checkbox' component is used to render a checkbox.
                    // The 'checked' prop is set to true if the value of the
                    // field includes the ID of the option. The 'onChange' prop
                    // is set to a function that toggles the value of the field
                    // when the user selects or deselects the option.
                    <Checkbox
                      checked={value.includes(option.id)}
                      onChange={() => {
                        if (value.includes(option.id)) {
                          onChange(
                            (value as string[]).filter(
                              (item) => item !== option.id
                            )
                          );
                        } else {
                          onChange([...value, option.id]);
                        }
                      }}
                    />
                  }
                  // The 'label' prop is set to the label of the option.
                  label={option.label}
                  // The 'key' prop is set to the ID of the option, which is
                  // used to identify the option in the DOM.
                  key={option.id}
                />
              ))}
            </FormGroup>
            {/* The 'FormHelperText' component is used to render an error message
            if there are any errors. */}
            <FormHelperText>{error?.message}</FormHelperText>
          </FormControl>
        );
      }}
    />
  );

}
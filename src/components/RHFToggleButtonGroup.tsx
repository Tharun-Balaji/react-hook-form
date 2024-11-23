
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/options";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

type Props<T extends FieldValues> = {
  /**
   * The path of the field in the form data.
   * This is used to register the field with react-hook-form.
   * The path is a string that represents the location of the field in the form data.
   * For example, if the form data is an object with a property called "foo"
   * and the field is a nested object with a property called "bar",
   * the path would be "foo.bar".
   */
  name: Path<T>;
  /**
   * An array of options to be displayed in the toggle button group.
   * Each option is an object with an "id" property and a "label" property.
   * The "id" property is used to identify the option and the "label" property
   * is used to display the option in the toggle button group.
   */
  options?: Option[];
};

/**
 * A react-hook-form wrapper for the MUI ToggleButtonGroup component.
 * The value of the component is an array of strings, where each string is
 * the id of an option.
 *
 * @example
 * import {RHFToggleButtonGroup} from "../components";
 * const options = [
 *   {id: "1", label: "First option"},
 *   {id: "2", label: "Second option"},
 *   {id: "3", label: "Third option"},
 * ];
 *
 * <RHFToggleButtonGroup
 *   name="options"
 *   options={options}
 * />
 *
 * This component will render a ToggleButtonGroup with three options.
 * The value of the component will be an array of strings, where each
 * string is the id of the corresponding option.
 */
export default function RHFToggleButtonGroup<T extends FieldValues>({
  name,
  options,
}: Props<T>) {

  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => {
        /**
         * The value of the ToggleButtonGroup is an array of strings, where
         * each string is the id of an option. If there's no value, we set it
         * to the id of the first option (if there are any options).
         */
        const newValue = value.length ? value : (options?.[0].id ? [options[0].id] : []);

        return (
          <ToggleButtonGroup
            // Handle change event for ToggleButtonGroup
            onChange={(_, newValue) => {
              // Only update if there's a new value
              if (newValue.length) {
                onChange(newValue);
              }
            }}
            // Set the value of the ToggleButtonGroup
            value={newValue}
            {...restField}
          >
            {options?.map((option) => (
              // Render each option as a ToggleButton
              <ToggleButton value={option.id} key={option.id}>
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        );
      }}
    />
  );
}


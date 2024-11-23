
import { FieldValues, Path, Controller, useFormContext } from "react-hook-form";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Option } from "../types/options";

/**
 * A react-hook-form wrapper for @mui's Autocomplete component.
 * 
 * @example
 * import {RHFAutocomplete} from "../components";
 * const options = [
 *   {id: "1", label: "First option"},
 *   {id: "2", label: "Second option"},
 *   {id: "3", label: "Third option"},
 * ];
 * 
 * <RHFAutocomplete
 *   name="states"
 *   options={options}
 *   label="States"
 * />
 * 
 * This component will render a text field with autocomplete functionality.
 * The value of the component will be an array of option IDs.
 */
type props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

/**
 * The core component for the autocomplete functionality.
 * 
 * @param name the name of the field in the form
 * @param options the options to be displayed in the autocomplete
 * @param label the label to be displayed on the text field
 */
export default function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: props<T>) {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        /**
         * Here we are using the @mui/Autocomplete component.
         * The isOptionEqualToValue prop is used to determine the equality
         * of two options. The getOptionLabel prop is used to get the label
         * of an option. The value prop is used to set the value of the text
         * field. The onChange prop is used to set the value of the field in
         * the form when the user selects an option.
         */
        return (
          <Autocomplete
            multiple
            options={options ?? []}
            // isOptionEqualToValue is used to determine whether two options are equal.
            // It is used by the Autocomplete component to determine whether the currently
            // selected value is equal to the option that the user is hovering over.
            isOptionEqualToValue={(option, value) => option.id === value.id}
            // getOptionLabel is used to get the label of an option.
            // It is used by the Autocomplete component to display the label of the option
            // in the dropdown list.
            getOptionLabel={(option) =>
              options?.find((item) => item.id === option.id)?.label ?? ""
            }
            // value is the currently selected value of the Autocomplete component.
            // It is an array of objects, where each object has an "id" property.
            // We need to map this array of objects to an array of strings, where each
            // string is the id of the corresponding option.
            value={value.map((id: string) =>
              options?.find((item) => item.id === id)
            )}
            // onChange is the function that is called when the user selects an option.
            // We need to map the selected option to its id, and then call the onChange
            // function that is passed to us by react-hook-form.
            onChange={(_, newValue) =>
              onChange(newValue.map((item) => item.id))
            }
            disableCloseOnSelect // Disable closing the dropdown when an option is selected
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                inputRef={ref}
                error={!!error}
                helperText={error?.message}
                label={label}
              />
            )}
            renderOption={(props, option, { selected }) => (
                <Box component="li" {...props}>
                  <Checkbox
                    icon={<CheckBoxOutlineBlank />}
                    checkedIcon={<CheckBox />}
                    checked={selected}
                  />
                  {option.label}
                </Box>
            )}
          />
        );
      }}
    />
  );
}



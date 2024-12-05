
import {  SubmitHandler, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { defaultValues, Schema } from "../types/schema";
import { Button, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack, TextField } from '@mui/material';
import { RHFAutocomplete, RHFCheckbox, RHFDateRangePicker, RHFDateTimePicker, RHFRadioGroup, RHFReactDateRangePicker, RHFSlider, RHFSwitch, RHFToggleButtonGroup } from "../../components";
import { useGenders, useLanguages, useSkills, useStates, useUser, useUsers } from "../services/queries";
import { Fragment, useEffect } from "react";
import { useCreateUser, useEditUser } from "../services/mutations";



/**
 * This component is a react-hook-form wrapper for a MUI Stack containing
 * two MUI TextFields and one RHFAutocomplete component.
 *
 * It uses the useFormContext hook to get the register function and
 * the formState object from the parent form context.
 *
 * It uses the useStates hook to get the states data from the API and
 * cache the result.
 *
 * The register function is used to register the name and email fields
 * with the parent form context.
 *
 * The formState object is used to get the errors object, which contains
 * any error messages for the fields.
 *
 * The RHFAutocomplete component is used to display the states data
 * in an autocomplete field.
 */
export default function Users() {

  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  const createUserMutation = useCreateUser();
  const editUserMutation = useEditUser();

  const {
    register,
    formState: { errors },
    control,
    reset,
    setValue,
    unregister,
    handleSubmit
  } = useFormContext<Schema>();

  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  const isTeacher = useWatch({ control, name: "isTeacher" });
  const variant = useWatch({ control, name: "variant" });
  const id = useWatch({ control, name: "id" });
  const userQuery = useUser(id);

  // When the user toggles the "isTeacher" field, we need to reset the students field array.
  // If the user is not a teacher, we need to remove the students field from the form.
  useEffect(() => {
    if (!isTeacher) {
      // Replace the students field array with an empty array.
      // This will remove the existing students from the form.
      replace([]);

      // Unregister the "students" field from the form.
      // This will prevent the user from submitting the students field when the form is submitted.
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  // When the user selects a new user from the list, we need to reset the form to the new user's data.
  useEffect(() => {
    if (userQuery.data) {
      // Reset the form to the new user's data.
      // This will update all of the fields on the form to the new user's data.
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

  /**
   * Resets the form to the default values.
   */
  const handleReset = () => {
    reset(defaultValues);
  };

  /**
   * Handles the click event on a user list item.
   * @param {string} id - The id of the user that was clicked.
   * Sets the "id" field on the form to the provided id.
   */
  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMutation.mutate(data);
    }
  };

  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          <TextField
            {...register("name")}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            {...register("email")}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <RHFAutocomplete<Schema>
            name="states"
            options={statesQuery.data}
            label="States"
          />
          <RHFToggleButtonGroup<Schema>
            name="languagesSpoken"
            options={languagesQuery.data}
          />
          <RHFRadioGroup<Schema>
            name="gender"
            options={gendersQuery.data}
            label="Gender"
          />
          <RHFCheckbox<Schema>
            name="skills"
            options={skillsQuery.data}
            label="Skills"
          />
          <RHFDateTimePicker<Schema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <RHFReactDateRangePicker<Schema> name="formerEmploymentPeriod" />
          {/* <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" /> */}
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />
          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <TextField
                {...register(`students.${index}.name`)}
                fullWidth
                label="Name"
                key={field.id}
              />
              <Button color="error" onClick={() => remove(index)} type="button">
                {" "}
                Remove
              </Button>
            </Fragment>
          ))}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">
              {" "}
              {variant === "create" ? "New User" : "Edit User"}
            </Button>
            <Button onClick={handleReset}>{"Reset"}</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}


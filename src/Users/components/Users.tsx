
import {  useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { Stack, TextField } from '@mui/material';
import { RHFAutocomplete } from "../../components";
import { useStates } from "../services/queries";


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


  const { register, formState: { errors } } = useFormContext<Schema>();

  return (
    <Stack sx={{gap:2}}>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name='states'
        options={statesQuery.data}
        label="States"
      />
    </Stack>
  )
}



import {  useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { Stack, TextField } from '@mui/material';
import { RHFAutocomplete } from "../../components";
import { useStates } from "../services/queries";


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

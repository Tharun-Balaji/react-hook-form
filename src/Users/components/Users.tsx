
import {  useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import { Stack, TextField } from '@mui/material';
import { RHFAutocomplete } from "../../components";


export default function Users() {

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
        options={[
          {id: "1", label: "Maharashtra"},
          { id: "2", label: "Karnataka" },
          { id: "3", label: "Tamil Nadu" },
        ]}
        label="States"
      />
    </Stack>
  )
}

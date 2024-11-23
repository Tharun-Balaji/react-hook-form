
import { useForm } from "react-hook-form";
import { schema, Schema } from "../../types/schema";
import { Stack, TextField } from '@mui/material';
import { zodResolver } from "@hookform/resolvers/zod";

export default function Users() {

  const { register, formState: { errors } } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

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
    </Stack>
  )
}

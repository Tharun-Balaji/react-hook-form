import { FormProvider, useForm } from "react-hook-form";
import { schema, Schema, defaultValues } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Users from "./Users";



export default function UsersProvider() {

  const methods = useForm<Schema>({
		mode: 'all',
    resolver: zodResolver(schema),
    defaultValues
	});

  return (
    <FormProvider {...methods} >
      <Users/>
    </FormProvider>
  )
}

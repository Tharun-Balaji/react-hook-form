
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues, schema, Schema } from "../types/schema";
import Users from "./Users";


/**
 * This component is the provider for the form in the Users component.
 * It wraps the Users component with the FormProvider component from react-hook-form.
 * The FormProvider component provides the context for the form and its fields.
 * The useForm hook is used to create the form methods and register the form fields.
 * The DevTool component is also wrapped around the Users component to provide
 * a debugging interface for the form.
 */
export default function UsersProvider() {

  /**
   * The useForm hook is used to create the form methods and register the
   * form fields. The options object passed to useForm is used to configure
   * the form. The mode option is set to 'all' to revalidate the entire form
   * whenever any field changes. The resolver option is set to the zod resolver
   * to use the zod schema to validate the form. The defaultValues option is set
   * to the default values for the form fields.
   */
  const methods = useForm<Schema>({
		mode: 'all',
    resolver: zodResolver(schema),
    defaultValues
	});

  return (
    /**
     * The FormProvider component is used to wrap the Users component and
     * provide the context for the form and its fields.
     */
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
}


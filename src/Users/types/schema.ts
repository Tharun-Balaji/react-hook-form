import { z } from "zod";
import { patterns } from "../../constants";

// Define a schema using Zod that represents a form with validation rules
export const schema = z
  .intersection(
    // First part of the intersection: define an object schema with various fields
    z.object({
      // Name field: required string with minimum length of 1
      name: z.string().min(1, { message: "Name is required" }),

      // Email field: required string with regex validation
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((email) => patterns.email.test(email), {
          message: "Invalid email address",
        }),

      // States field: array of strings, requires at least 1 and at most 2 elements
      states: z.array(z.string()).min(1).max(2),

      // Languages spoken: array of strings without specific limits
      languagesSpoken: z.array(z.string()),

      // Gender field: required string with minimum length of 1
      gender: z.string().min(1),

      // Skills field: array of strings, allows a maximum of 2 elements
      skills: z
        .array(z.string())
        .max(2, { message: "You can only select up to 2 skills" }),

      // Registration date and time: required date
      registrationDateAndTime: z.date(),

      // Former employment period: array of dates, allows a maximum of 2
      formerEmploymentPeriod: z.array(z.date()).max(2),

      // Salary range: array of numbers, allows a maximum of 2
      salaryRange: z.array(z.number()).max(2),

      // Is teacher: required boolean
      isTeacher: z.boolean(),
    }),

    // Second part of the intersection: discriminated union for variant type
    z.discriminatedUnion("variant", [
      // Create variant: requires the variant to be 'create'
      z.object({
        variant: z.literal("create"),
      }),
      // Edit variant: requires the variant to be 'edit' and an ID
      z.object({
        variant: z.literal("edit"),
        id: z.string().min(1),
      }),
    ])
  )
  .and(
    // Define a union of two objects:
    // 1. If isTeacher is false, no additional fields are required
    // 2. If isTeacher is true, a students field is required, which is an array of objects
    //    with a name field that has a minimum length of 4
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(
          z.object({
            name: z.string().min(4),
          })
        ),
       })
    ])
  );

// Infer the TypeScript type from the defined schema
export type Schema = z.infer<typeof schema>;



export const defaultValues: Schema = {
  variant: 'create',
  email: "",
  name: "",
  states: [],
  languagesSpoken: [],
  gender: "",
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange: [0, 2000],
  isTeacher: false
};

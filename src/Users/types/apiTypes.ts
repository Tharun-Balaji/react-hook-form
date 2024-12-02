
/**
 * Create and Edit API types
 *
 * The API types are built by combining the Common type with either the Create or Edit type.
 * The Common type contains the properties that are shared between the create and edit endpoints.
 * The Create and Edit types contain the properties that are specific to the create and edit endpoints.
 */
type Create = {
  variant: "create";
}

type Edit = {
  variant: "edit";
  id: number; 
}

/**
 * Common properties between the create and edit endpoints
 *
 * The Common type contains the properties that are shared between the create and edit endpoints.
 * These properties are the ones that are required for both the create and edit endpoints.
 */
export type Common = {
  email: string;
  name: string;
  states: string[];
  gender: string;
  languagesSpoken: string[];
  skills: string[];
  registrationDateAndTime: string;
  formerEmploymentPeriod: [string, string];
  salaryRange: [number, number];
  isTeacher: boolean;
  students: {
    name: string;
  }[];
};

/**
 * The API type for the create endpoint
 *
 * The ApiCreateEdit type is a union of the Common type and the Create type.
 * This type is used to define the shape of the data that is sent to the create endpoint.
 */
export type ApiCreateEdit = Common & (Create | Edit);

/**
 * The API type for the get endpoint
 *
 * The ApiGet type is a union of the Common type and the Edit type.
 * This type is used to define the shape of the data that is returned from the get endpoint.
 */
export type ApiGet = Edit & Common;


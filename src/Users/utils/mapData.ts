import { Schema } from "../types/schema";
import { ApiCreateEdit, Common } from "../types/apiTypes";

/**
 * Maps a Schema object to an ApiCreateEdit object.
 *
 * This function takes a Schema object as an argument and returns an ApiCreateEdit
 * object. The ApiCreateEdit object will have the variant property set to either
 * "create" or "edit" based on the value of the variant property in the Schema
 * object. If the variant property is set to "create", then the ApiCreateEdit object
 * will only contain the common properties. If the variant property is set to "edit",
 * then the ApiCreateEdit object will contain the common properties and the id
 * property.
 *
 * @param {Schema} data The Schema object to be mapped.
 * @returns {ApiCreateEdit} The ApiCreateEdit object that is mapped from the
 * Schema object.
 */
function mapData(data: Schema): ApiCreateEdit {
  const common: Common = {
    email: data.email,
    formerEmploymentPeriod: [
      data.formerEmploymentPeriod[0].toString(),
      data.formerEmploymentPeriod[1].toString(),
    ],
    name: data.name,
    gender: data.gender,
    languagesSpoken: data.languagesSpoken,
    registrationDateAndTime: data.registrationDateAndTime.toString(),
    salaryRange: [data.salaryRange[0], data.salaryRange[1]],
    skills: data.skills,
    states: data.states,
    isTeacher: data.isTeacher,
    students: data.isTeacher === true ? data.students : [],
  };

  switch (data.variant) {
    case "create": {
      return { ...common, variant: data.variant };
    }
    case "edit": {
      return { ...common, id: Number(data.id), variant: data.variant };
    }
  }
}

export{mapData};

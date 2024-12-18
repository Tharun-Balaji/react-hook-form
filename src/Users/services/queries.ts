/**
 * This file contains functions for querying the REST API.
 * The functions use @tanstack/react-query to cache the results
 * of the queries. The queries are used by the components in this
 * directory to fetch data from the API.
 * @packageDocumentation
 */

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Option } from '../../types/options';
import { ApiGet } from '../types/apiTypes';
import { Schema } from "../types/schema";
import { url } from '../../constants';


/**
 * A function for querying the list of states from the API.
 * @returns A react-query hook that fetches the list of states
 * from the API and caches the result.
 */
 function useStates() { 
  return useQuery({
    // The query key is used to identify the query in the cache.
    // It is used to determine whether the query has already been
    // executed and whether the result is cached.
    queryKey  : ['states'],
    // The query function is the function that fetches the data
    // from the API. It is called when the query is executed.
    queryFn: () => axios.get<Option[]>(url.concat("/states"))
      .then(res => res.data)
  })
};

/**
 * A function for querying the list of languages from the API.
 * @returns A react-query hook that fetches the list of languages
 * from the API and caches the result.
 */
 function useLanguages() {
	return useQuery({
		// The query key is used to identify the query in the cache.
		// It is used to determine whether the query has already been
		// executed and whether the result is cached.
		queryKey: ['languages'],
		// The query function is the function that fetches the data
		// from the API. It is called when the query is executed.
		queryFn: () =>
			axios
				.get<Option[]>(url.concat("/languages"))
				.then((res) => res.data),
	});
}

/**
 * A function for querying the list of genders from the API.
 * @returns A react-query hook that fetches the list of genders
 * from the API and caches the result.
 */
 function useGenders() {
	return useQuery({
		// The query key is used to identify the query in the cache.
		// It is used to determine whether the query has already been
		// executed and whether the result is cached.
		queryKey: ['genders'],
		// The query function is the function that fetches the data
		// from the API. It is called when the query is executed.
		queryFn: () =>
			axios
				.get<Option[]>(url.concat("/genders"))
				.then((res) => res.data),
	});
}

/**
 * A function for querying the list of skills from the API.
 * @returns A react-query hook that fetches the list of skills
 * from the API and caches the result.
 */
 function useSkills() {
	return useQuery({
		// The query key is used to identify the query in the cache.
		// It is used to determine whether the query has already been
		// executed and whether the result is cached.
		queryKey: ['skills'],
		// The query function is the function that fetches the data
		// from the API. It is called when the query is executed.
		queryFn: () =>
			axios
				.get<Option[]>(url.concat("/skills"))
				.then((res) => res.data),
	});
}


/**
 * A function for querying the list of users from the API.
 * @returns A react-query hook that fetches the list of users.
 * Each user is represented as an Option object with an "id" and "label".
 * The "id" is the user's identifier and "label" is the user's name.
 * The array of users is sorted alphabetically by the "label" property.
 */
function useUsers() {
  return useQuery({
    queryKey: ["users"],
		/**
		 * The query function is the function that fetches the data
		 * from the API. It is called when the query is executed.
		 * @returns A promise that resolves to an array of options,
		 * where each option has an "id" property and a "label" property.
		 * The "id" property is the id of the user, and the "label" property
		 * is the name of the user. The array is sorted alphabetically by
		 * the "label" property.
		 */
		queryFn: (): Promise<Option[]> => axios.get<ApiGet[]>(url.concat("/users"))
			.then((response) =>
        response.data.map((user) => ({
          id: user.id.toString(),
          label: user.name,
        } satisfies Option))
      ),
  });
}


/**
 * A function for querying a specific user from the API by their ID.
 * 
 * This function utilizes the `useQuery` hook from `@tanstack/react-query`
 * to fetch and cache the data of a single user identified by the provided ID.
 * 
 * The data fetched includes the user's name, email, employment period, gender,
 * spoken languages, registration date and time, salary range, skills, states,
 * students, and whether the user is a teacher.
 * 
 * The result conforms to the `Schema` type, ensuring all fields are correctly
 * formatted and present. It returns a promise that resolves to an object
 * containing these fields.
 * 
 * @param {string} id - The unique identifier of the user to be fetched.
 * @returns {object} An object representing the user's data, adhering to the `Schema` type.
 */
function useUser(id: string) {

  return useQuery({
    // The query key is used to identify the query in the cache.
    // It is used to determine whether the query has already been
    // executed and whether the result is cached.
    queryKey: ["user", { id }],
    // The query function is the function that fetches the data
    // from the API. It is called when the query is executed.
    queryFn: async (): Promise<Schema> => {
      const res = await axios
        .get<ApiGet>(url.concat(`/users/${id}`))
        .then((res) => res.data)

      return {
        variant: "edit",
        id: res.id.toString(),
        name: res.name,
        email: res.email,
        formerEmploymentPeriod: [
          new Date(res.formerEmploymentPeriod[0]),
          new Date(res.formerEmploymentPeriod[1]),
        ],
        gender: res.gender,
        languagesSpoken: res.languagesSpoken,
        registrationDateAndTime: new Date(res.registrationDateAndTime),
        salaryRange: [res.salaryRange[0], res.salaryRange[1]],
        skills: res.skills,
        states: res.states,
        students: res.students,
        isTeacher: res.isTeacher,
      };
		},
		enabled: !!id,
  });
}

export {
	useStates,
	useLanguages,
	useGenders,
	useSkills,
	useUsers,
	useUser
}

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

/**
 * The base URL of the REST API.
 * This is used to construct the full URL of each query.
 */
const url : string = 'http://localhost:8080';

/**
 * A function for querying the list of states from the API.
 * @returns A react-query hook that fetches the list of states
 * from the API and caches the result.
 */
export function useStates() { 
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
export function useLanguages() {
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
export function useGenders() {
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
export function useSkills() {
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

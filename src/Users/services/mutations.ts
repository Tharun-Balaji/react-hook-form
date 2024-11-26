import { QueryClient, useMutation } from "@tanstack/react-query"
import { Schema } from "../types/schema";
import axios from "axios";

const url = 'http://localhost:8080';



/**
 * A custom React hook for creating a new user by posting data to the API.
 * 
 * This hook utilizes the `useMutation` hook from `@tanstack/react-query` to handle
 * the asynchronous operation of posting user data to the `/users` endpoint.
 * 
 * The data to be posted should adhere to the `Schema` type, ensuring that all
 * required fields are included and correctly formatted.
 * 
 * Upon successful creation of a user, the "users" query cache is invalidated 
 * to ensure fresh data is fetched on subsequent queries, and a success message 
 * is displayed to the user.
 * 
 * @returns A mutation object that contains methods and state related to the mutation.
 */
function useCreateUser() {
  return useMutation({


    /**
     * Posts the given data to the /users endpoint.
     * @param {Schema} data The data to be posted, which should match the Schema type.
     * @returns {Promise<void>} A promise that resolves when the post is complete.
     */
    mutationFn: async (data: Schema) => {
      await axios.post(url.concat("/users"), data);
    },

    /**
     * After a successful mutation, invalidate the "users" query
     * and alert the user that the user was created successfully.
     */
    onSuccess: async () => {
      await QueryClient.invalidateQueries({ queryKey: ["users"] });
      alert("User created successfully!");
    },
  });
}

export {
  useCreateUser
}
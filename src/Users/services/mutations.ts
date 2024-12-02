import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { Schema } from "../types/schema";
import axios from "axios";
import { omit } from "lodash";
import { mapData } from "../utils/mapData";
import { url } from "../../constants";


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




/**
 * A custom React hook for editing an existing user by making a PUT request to the API.
 *
 * This hook utilizes the `useMutation` hook from `@tanstack/react-query` to handle
 * the asynchronous operation of making a PUT request to the `/users/:id` endpoint.
 *
 * The data to be passed to the mutate method should adhere to the `Schema` type, ensuring
 * that all required fields are included and correctly formatted.
 *
 * Upon successful completion of the mutation, the "users" query cache is invalidated
 * to ensure fresh data is fetched on subsequent queries. If the mutation is an edit
 * operation, the cache for the specific user that was edited is also invalidated, ensuring
 * that subsequent queries for that user fetch fresh data.
 *
 * A success message is displayed to the user after the mutation is successful.
 *
 * @returns A mutation object that contains methods and state related to the mutation.
 */
function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    /**
     * The mutation function for useEditUser.
     *
     * This function will be called with the data that is passed to the mutate method.
     * It is an async function that should return a promise that resolves when the mutation is complete.
     *
     * If the variant is "edit", the function will make a PUT request to the /users/:id endpoint
     * with the data that was passed in, minus the "variant" field. If the variant is not "edit",
     * the function does nothing.
     * @param {Schema} data The data to be used in the mutation.
     * @returns {Promise<void>} A promise that resolves when the mutation is complete.
     */
    mutationFn: async (data: Schema) => {
      if (data.variant === "edit") {
        await axios.put(
          `http://localhost:8080/users/${data.id}`,
          omit(mapData(data), "variant")
        );
        alert("User edited successfully!");
      }
    },
/**
 * Handles the successful completion of the user mutation.
 * 
 * This function is called when the user mutation is successful.
 * It invalidates the cached "users" query to ensure that the
 * user list is updated with the changes. If the mutation is
 * an edit operation, it also invalidates the cache for the
 * specific user that was edited, ensuring that subsequent
 * queries for that user fetch fresh data.
 * 
 * @param _ - Unused parameter.
 * @param variables - The variables used in the mutation, containing
 * information such as the variant of the mutation and the user id
 * if the variant is "edit".
 */
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
  });
}

export {
  useCreateUser,
  useEditUser
};

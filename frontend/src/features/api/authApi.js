import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth.slice.js";

const USER_API = "http://localhost:8000/api/v1/user/"
export const authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (inputData) => ({
                url:"register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser: builder.mutation({
            query: (inputData) => ({
              url: "login",
              method: "POST",
              body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
              try {
                // Wait for the query to fulfill
                const result = await queryFulfilled;  // 'result' contains the full response
          
                // Access the data object from the response (the user object should be here)
                if (result && result.data) {
                  console.log("API Response:", result.data);  // Log the full response data
                  dispatch(userLoggedIn({ user: result.data.user }));  // Dispatch the user data to the Redux store
                }
              } catch (error) {
                console.error("Error during login:", error);  // Handle any errors that occur during the API call
              }
            }
          }),
          
        logoutUser: builder.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try { 
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => ({
                url:"profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        })
    })
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation
} = authApi;
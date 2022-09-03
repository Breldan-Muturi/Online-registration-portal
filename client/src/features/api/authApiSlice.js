import { logOut, setCredentials } from "../global/authSlice";
import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    googleAuth: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/google",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/api/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState);
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoginMutation,
  useRegisterMutation,
  useGoogleAuthMutation,
  useLogoutMutation,
} = authApiSlice;

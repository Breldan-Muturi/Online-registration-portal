import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => "/api/refresh",
    }),
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
    logout: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/logout",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useRefreshTokenQuery,
  useLoginMutation,
  useRegisterMutation,
  useGoogleAuthMutation,
  useLogoutMutation,
} = authApiSlice;

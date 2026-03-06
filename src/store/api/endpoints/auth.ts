import { AuthResponse, UserDataResponse } from "../../../types/auth";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    Login: builder.mutation<AuthResponse, any>({
      query: (body) => ({
        url: "/api/login",
        method: "POST",
        body,
      }),
    }),

    LogOut: builder.mutation<AuthResponse, void>({
      query: () => ({
        url: "/api/logout",
        method: "POST",
      }),
    }),

    getUserData: builder.query<UserDataResponse, void>({
      query: () => `/api/user-data`,
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useLogOutMutation, useGetUserDataQuery } =
  authApi;

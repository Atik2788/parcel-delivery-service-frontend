/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../app/store";
import { setCredentials, logOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Wrap baseQuery to handle 401 and auto refresh
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Try refreshing token
    const refreshResult: any = await baseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // store new access token
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.accessToken,
          user: refreshResult.data.user, // optional, যদি backend ফেরত দেয়
        })
      );

      // Retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh failed, log out user
      api.dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Parcel"],
  endpoints: () => ({}),
});

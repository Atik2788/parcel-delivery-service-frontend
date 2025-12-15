import { baseApi } from "@/features/api/baseApi";
import { setCredentials } from "./authSlice";

export interface RefreshResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
}


export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role?: "SENDER" | "RECEIVER" | "ADMIN" | "SUPER_ADMIN";
}

export interface RegisterResponse {
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===== Login =====
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // localStorage save
          localStorage.setItem("refreshToken", data.data.refreshToken);
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.data.user));

          // Redux state update
          dispatch(
            setCredentials({
              user: data.data.user,
              accessToken: data.data.accessToken,
            })
          );
        } catch (err) {
          console.error("Login failed", err);
        }
      },
    }),

    // ===== Refresh Token =====
    refreshToken: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include", // খুব গুরুত্বপূর্ণ
      }),
    }),

    // ===== Register =====
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: "/users/register", // baseUrl already /api/v1
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          // LocalStorage save
          localStorage.setItem("refreshToken", data.refreshToken);
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));

          // Redux state update
          dispatch(
            setCredentials({
              user: data.user,
              accessToken: data.accessToken,
            })
          );
        } catch (err) {
          console.error("Register failed", err);
        }
      },
    }),
  }),
});

// Export all hooks
export const { useLoginMutation, useRefreshTokenMutation, useRegisterMutation } = authApi;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "SENDER" | "RECEIVER" | "ADMIN" | "SUPER_ADMIN";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthLoading: boolean;
}

/* 🔐 Hydrate from localStorage */
const initialState: AuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,

  accessToken: localStorage.getItem("accessToken"),

  isAuthLoading: false,
};

interface SetCredentialsPayload {
  user: User;
  accessToken: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* ✅ Login / Refresh success */
    setCredentials: (
      state,
      action: PayloadAction<SetCredentialsPayload>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthLoading = false;
    },

    /* 🔄 When checking auth (refresh token) */
    startAuthLoading: (state) => {
      state.isAuthLoading = true;
    },

    /* 🚪 Logout */
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthLoading = false;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
  },
});

export const {
  setCredentials,
  logOut,
  startAuthLoading,
} = authSlice.actions;

export default authSlice.reducer;

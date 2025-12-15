import { createSlice  } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit"; // type-only import

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
}

// interface SetCredentialsPayload {
//   user: User | null;
//   accessToken: string;
// }

const initialState: AuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
setCredentials: (state, action) => {
  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken;
},

logOut: (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");; // localStorage থেকে remove
},
    

  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

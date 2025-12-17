// src/types/auth.ts
export interface AuthUser {
  _id: string;   // MongoDB ObjectId string
  role: "SENDER" | "RECEIVER" | "ADMIN";
  name: string;
  email: string;
  token?: string;
  phone?: string;
}


// src/service/adminService.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/adminRoute";
const API_URL2 = import.meta.env.VITE_API_BASE_URL + "/users";

const getToken = () => localStorage.getItem("accessToken") || "";

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";
  isActive: "ACTIVE"  | "BLOCKED" | "INACTIVE";
  phone?: string;
}

export interface AdminParcel {
  _id: string;
  trackingId: string;
  type: string;
  weight: number;
  fee: number;
  currentStatus:
    | "REQUESTED"
    | "APPROVED"
    | "DISPATCHED"
    | "IN_TRANSIT"
    | "DELIVERED"
    | "RETURNED"
    | "CANCELLED"
    | "BLOCKED";
  isBlocked?: boolean;
  sender?: { name?: string };
  receiver?: { name?: string };
}

export interface PaginationMeta {
  page: number;
  totalPages: number;
  [key: string]: number | string;
}

export const AdminService = {
  async getAllUsers(query?: { search?: string; page?: number; limit?: number }) {
    const res = await axios.get(`${API_URL}/all-users`, {
      headers: { Authorization: getToken() },
      params: query,
    });
    return res.data as { data: AdminUser[]; meta: PaginationMeta };
  },

  
  async getAllParcels(query?: { search?: string; page?: number; limit?: number }) {
    const res = await axios.get(`${API_URL}/all-parcels`, {
      headers: { Authorization: getToken() },
      params: query,
    });
    return res.data as { data: AdminParcel[]; meta: PaginationMeta };
  },

  async updateParcelBlocked(parcelId: string, isBlocked: boolean) {
    const res = await axios.patch(
      `${API_URL}/parcel-block/${parcelId}`,
      { isBlocked },
      { headers: { Authorization: getToken() } }
    );
    return res.data as { data: AdminParcel };
  },

  async updateUser(
    userId: string,
    updates: { isActive?: "ACTIVE" | "INACTIVE" | "BLOCKED"; isBlocked?: boolean }
  ) {
    const res = await axios.patch(
      `${API_URL2}/${userId}`,
      updates,
      { headers: { Authorization: getToken() } }
    );
    return res.data as { data: AdminUser };
  },
};

// src/service/parcelService.ts
import axios from "axios";
import type { TParcelStatus } from "@/types/parcel";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/parcels";


export const ParcelService = {
  // getMyParcelsReceiver: async () => {
  //   return API.get("/my-parcels-receiver");
  // },

 getMyParcelsReceiver() {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Access token not found");

  return axios.get(`${API_URL}/my-parcels-receiver`, {
    headers: { Authorization: token } // force attach token
  }).then(res => res.data);
},

  getIncomingParcels: async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");
    return axios.get(`${API_URL}/incoming-parcels`, {
      headers: { Authorization: token}
    }).then(res => res.data);
  },

  // Receiver parcel claim 
  claimParcel: async (parcelId: string, payload: { name: string; receiverPhone: string }) => {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token not found");
    return axios.patch(`${API_URL}/claim/${parcelId}`, payload, {
      headers: { 
        Authorization: token
      }
    }).then(res => res.data);
  },

   // Receiver tracking update
  updateTrackingReceiver: async (payload: { trackingId: string; currentStatus: TParcelStatus; location: string; note: string }) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");

    return axios.patch(`${API_URL}/update-tracking-receiver`, payload, {
      headers: { 
        Authorization: token
      }
    }).then(res => res.data);
  },

  // Receiver rating to sender
  giveRating: async (trackingId: string, rating: number, feedback: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");
    return axios.patch(`${API_URL}/rating/${trackingId}`, { rating, feedback }, {
      headers: { 
        Authorization: token
      }
    }).then(res => res.data);
  },
};

// src/service/parcelService.ts
import axios from "axios";
import type { TParcelStatus } from "@/types/parcel";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/parcels";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const ParcelService = {
  getMyParcelsReceiver: async () => {
    return API.get("/my-parcels-receiver");
  },

  // Receiver parcel claim করবে
  claimParcel: async (parcelId: string) => {
    return API.patch(`/claim/${parcelId}`);
  },

  // Receiver tracking update করবে
  updateTrackingReceiver: async (payload: { trackingId: string; currentStatus: TParcelStatus }) => {
    return API.patch("/update-tracking-receiver", payload);
  },

  // Receiver sender কে rating দেবে
  giveRating: async (trackingId: string, rating: number, feedback: string) => {
    return API.patch(`/rating/${trackingId}`, { rating, feedback });
  },
};

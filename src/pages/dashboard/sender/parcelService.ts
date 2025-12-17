
import api from "@/features/api/axios";
import type { IParcelCreatePayload, IUpdateTrackingPayload } from "@/types/parcel";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const ParcelService = {
  createParcel(payload: IParcelCreatePayload) {
    return api.post("/parcels", payload).then(res => res.data);
  },

  /* cancelParcel(parcelId: string) {
    return api.patch(`/parcels/cancel/${parcelId}`, {}).then(res => res.data);
  }, */

  cancelParcel(parcelId: string) {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("Access token not found");

  return axios.patch(`${API_URL}/parcels/cancel/${parcelId}`, {}, {
    headers: { Authorization: token } // force attach token
  }).then(res => res.data);
},

  updateTrackingSender(payload: IUpdateTrackingPayload) {
    return api
      .patch("/parcels/update-tracking-sender", payload)
      .then(res => res.data);
  },


  giveRating(trackingId: string, rating: number, feedback: string) {
    return api
      .patch(`/parcels/rating/${trackingId}`, { rating, feedback })
      .then(res => res.data);
  },

  getMyParcelsSender() {
    return api
      .get("/parcels/my-parcels-sender")
      .then(res => res.data);
  },

  getMyParcelsReceiver() {
    return api
      .get("/parcels/my-parcels-receiver")
      .then(res => res.data);
  },
};

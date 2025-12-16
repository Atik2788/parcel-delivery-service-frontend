

import type { AuthUser } from "@/types/auth";
import type { IParcelCreatePayload, IUpdateTrackingPayload } from "@/types/parcel";
import axios from 'axios';

// const API_URL = "https://parcel-delivery-api-a9en.onrender.com/api/v1/parcels";
const API_URL = import.meta.env.VITE_API_BASE_URL + "/parcels";



export const ParcelService = { 

  async createParcel(senderJwt: AuthUser, payload: IParcelCreatePayload) {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");

    const res = await axios.post(`${API_URL}`, payload, {
      headers: { Authorization:token },
    });
    return res.data;
  },

  async cancelParcel(parcelId: string) {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");

    const res = await axios.patch(
      `${API_URL}/cancel/${parcelId}`,
      {},
      { headers: { Authorization: token} }
    );
    return res.data;
  },

  async updateTrackingSender(payload: IUpdateTrackingPayload) {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");

    const res = await axios.patch(
      `${API_URL}/update-tracking-sender`,
      payload,
      { headers: { Authorization: token } }
    );
    return res.data;
  },

  async giveRating(trackingId: string, rating: number, feedback: string) {

    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("Access token not found");

    const res = await axios.patch(

      `${API_URL}/rating/${trackingId}`,
      { rating, feedback },
      { headers: { Authorization: token } }
    );
    return res.data;
  },

    async getMyParcelsSender() {
      const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("Access token not found");

      const res = await axios.get(`${API_URL}/my-parcels-sender`,{
         headers: { Authorization: token} }
      );
      console.log(res.data)
      return res.data || [];
  },

  async getMyParcelsReceiver(receiver: AuthUser) {
    const res = await axios.get(
      `${API_URL}/my-parcels-receiver`,
      { headers: { Authorization: `Bearer ${receiver.token}` } }
    );
    return res.data;
  },
};
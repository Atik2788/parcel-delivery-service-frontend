/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/parcel/parcelApi.ts

import type { IParcelCreatePayload } from "@/types/parcel";
import { baseApi } from "../api/baseApi";

export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create parcel
    createParcel: builder.mutation<any, IParcelCreatePayload>({
      query: (payload) => ({
        url: "/parcels",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Parcel"],
    }),

    // ✅ Cancel parcel
    cancelParcel: builder.mutation<any, string>({
      query: (parcelId) => ({
        url: `/parcels/${parcelId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Parcel"],
    }),

    // ✅ Get sender parcels
    getMyParcelsSender: builder.query<any, void>({
      query: () => ({
        url: "/parcels/sender",
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),

    // ✅ Update tracking (sender)
    updateTrackingSender: builder.mutation<any, { trackingId: string; currentStatus: string }>({
      query: (payload) => ({
        url: "/parcels/tracking/sender",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Parcel"],
    }),

    // ✅ Give rating
    giveRating: builder.mutation<any, { trackingId: string; rating: number; feedback: string }>({
      query: ({ trackingId, rating, feedback }) => ({
        url: `/parcels/${trackingId}/rating`,
        method: "POST",
        body: { rating, feedback },
      }),
      invalidatesTags: ["Parcel"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useCancelParcelMutation,
  useGetMyParcelsSenderQuery,
  useUpdateTrackingSenderMutation,
  useGiveRatingMutation,
} = parcelApi;

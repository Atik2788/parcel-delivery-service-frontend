/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { AuthUser } from "@/types/auth";
import type { Parcel } from "@/types/parcel";
import { toast } from "sonner";
import RatingModal from "../sender/RatingModal";
import { ParcelService } from "./receiverService";
import ClaimParcelModal from "./ClaimParcelModa";
import TrackingUpdateModal from "./TrackingUpdateModal";

export const ReceiverDashboard = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as AuthUser | null;

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(null);

  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(false);

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimableParcels, setClaimableParcels] = useState<Parcel[]>([]);

  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingPayload, setTrackingPayload] = useState<{
    trackingId: string;
    currentStatus: "IN_TRANSIT" | "DELIVERED";
  } | null>(null);



  // 🚀 Load parcels on mount
  useEffect(() => {
    const fetchParcels = async () => {
      setLoading(true);
      try {
        const response = await ParcelService.getMyParcelsReceiver();
        setParcels(response.data || []);
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchParcels();
    }
  }, [user]);


  if (!user) {
    return <p>Please login</p>;
  }
  if (loading) {
    return (
      <p className="flex flex-col text-background text-xl container mx-auto min-h-screen bg-chart-3 px-4 py-20 items-center justify-between gap-4">
        Loading parcels...
      </p>
    );
  }


    const fetchClaimableParcels = async () => {
        const toastId = toast.loading("Loading claimable parcels...");
        // setClaimLoading(true);
      try {
        const response = await ParcelService.getIncomingParcels();
        setClaimableParcels(response.data || []);
        setShowClaimModal(true);
        toast.success("Claimable parcels loaded ✅", { id: toastId });
      } catch (err: any) {
        toast.error(err.message);
      }
    };


    const openTrackingModal = (
      trackingId: string,
      currentStatus: "IN_TRANSIT" | "DELIVERED"
    ) => {
      setTrackingPayload({ trackingId, currentStatus });
      setShowTrackingModal(true);
    };
    
  // 🚀 Claim parcel
  // const handleClaim = async (parcelId: string) => {
  //   try {
  //     await ParcelService.claimParcel(parcelId);
  //     setParcels(prev =>
  //       prev.map(p => (p._id === parcelId ? { ...p, currentStatus: "DISPATCHED" } : p))
  //     );
  //     toast.success("Parcel claimed ✅");
  //   } catch (err: any) {
  //     toast.error(err.message);
  //   }
  // };

  // 🚀 Update tracking (receiver side)
    const handleTrackingSubmit = async (data: {
      trackingId: string;
      currentStatus: "IN_TRANSIT" | "DELIVERED";
      location: string;
      note: string;
    }) => {
      try {
        await ParcelService.updateTrackingReceiver(data);

        setParcels(prev =>
          prev.map(p =>
            p.trackingId === data.trackingId
              ? { ...p, currentStatus: data.currentStatus }
              : p
          )
        );

        toast.success("Tracking updated ✅");
      } catch (err: any) {
        toast.error(
          err?.response?.data?.message ||
          "Failed to update tracking"
        );
      }
    };


  

  // 🚀 Give rating (receiver → sender)
  const handleRatingSubmit = async (rating: number, feedback: string) => {
    if (!selectedTrackingId) return;
    try {
      await ParcelService.giveRating(selectedTrackingId, rating, feedback);
      toast.success("Rating submitted ✅");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit rating");
    }
  };

  return (
    <div className="bg-chart-3">
      <div className="flex flex-col container mx-auto px-4 py-20 items-center justify-between gap-4">
        <h1 className="text-3xl text-background font-bold mb-4">Receiver Dashboard</h1>
        <button
          onClick={async () => {
            await fetchClaimableParcels();
          }}
          className="bg-primary text-background px-4 py-2 rounded self-end"
        >
          + Claim Parcel
        </button>


        <table className="w-full text-sm border">
          <thead className="bg-muted text-sidebar-foreground">
            <tr>
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Sender</div>
            </th>
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Addresses</div>
            </th>
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Weight</div>
            </th>
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Fee</div>
            </th>
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Status</div>
            </th>
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Actions</div>
            </th>
            </tr>
          </thead>
          <tbody className="text-background">
            {parcels.map(p => (
              <tr key={p._id} className="border-b">
                <td className="p-2">
                  {p.sender?.name ? (
                    <span>{p.sender?.name}, Phone: {p.sender?.deliveryPhone}, 
                      {p.ratings?.senderToReceiver?.rating ? (
                        <span className="text-yellow-400 font-semibold"> S.R: {p.ratings?.senderToReceiver?.rating}⭐</span>
                      ) : (
                        <span className="text-gray-400"></span>
                      )}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </td>
                <td className="p-2">
                  <div className="text-xs">
                    Pickup: {[
                      p.receiver?.pickupAddress?.extra,
                      p.receiver?.pickupAddress?.area,
                      p.receiver?.pickupAddress?.postOffice,
                      p.receiver?.pickupAddress?.district,
                      p.receiver?.pickupAddress?.division,
                      " Phone:",
                      p.receiver?.pickupPhone
                    ].filter(Boolean).join(", ")}
                  </div>
                  <div className="text-xs">
                    Delivery: {[
                      p.receiver?.deliveryAddress?.extra,
                      p.receiver?.deliveryAddress?.area,
                      p.receiver?.deliveryAddress?.postOffice,
                      p.receiver?.deliveryAddress?.district,
                      p.receiver?.deliveryAddress?.division,
                      " Phone:",
                      p.receiver?.deliveryPhone
                    ].filter(Boolean).join(", ")}
                  </div>
                </td>
                <td className="p-2">{p.weight} kg</td>
                <td className="p-2">৳ {p.fee}</td>
                <td className="p-2">{p.currentStatus}</td>
                <td className="p-2 flex gap-2">

                {(p.currentStatus === "DELIVERED") && (
                  p.ratings?.receiverToSender?.rating != null ? (
                    <span className="font-semibold text-yellow-400">
                      Your rating: {p.ratings.receiverToSender.rating} ⭐
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedTrackingId(p.trackingId);
                        setShowRatingModal(true);
                      }}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Rate
                    </button>
                  )
                )}

                  {p.currentStatus === "DISPATCHED" && (
                    <button
                      onClick={() => openTrackingModal(p.trackingId, "IN_TRANSIT")}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Mark In Transit
                    </button>
                  )}

                  {p.currentStatus === "IN_TRANSIT" && (
                    <button
                      onClick={() => openTrackingModal(p.trackingId, "DELIVERED")}
                      className="bg-purple-500 text-white px-2 py-1 rounded"
                    >
                      Mark Delivered
                    </button>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <RatingModal
          open={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />

        <ClaimParcelModal
          open={showClaimModal}
          onClose={() => setShowClaimModal(false)}
          user={user}
          claimableParcels={claimableParcels}
          setParcels={setParcels}
        />


        <TrackingUpdateModal
        open={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        payload={trackingPayload}
        onSubmit={handleTrackingSubmit}
      />



      </div>
    </div>
  );
};

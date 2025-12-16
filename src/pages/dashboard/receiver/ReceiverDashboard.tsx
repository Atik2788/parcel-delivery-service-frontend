/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { ParcelService } from "@/pages/dashboard/sender/parcelService";
import type { AuthUser } from "@/types/auth";
import type { Parcel } from "@/types/parcel";
import { toast } from "sonner";
import RatingModal from "../sender/RatingModal";

export const ReceiverDashboard = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as AuthUser | null;

  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(null);

  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [loading, setLoading] = useState(false);

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

  // 🚀 Claim parcel
  const handleClaim = async (parcelId: string) => {
    try {
      await ParcelService.claimParcel(parcelId);
      setParcels(prev =>
        prev.map(p => (p._id === parcelId ? { ...p, currentStatus: "DISPATCHED" } : p))
      );
      toast.success("Parcel claimed ✅");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 🚀 Update tracking (receiver side)
 const handleUpdateTracking = async (trackingId: string, status: string) => {
    try {
      await ParcelService.updateTrackingReceiver({ trackingId, currentStatus: status });
      setParcels(prev =>
        prev.map(p => (p.trackingId === trackingId ? { ...p, currentStatus: status } : p))
      );
      toast.success("Tracking updated ✅");
    } catch (err: any) {
      toast.error(err.message);
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

        <table className="w-full text-sm border">
          <thead className="bg-muted text-sidebar-foreground">
            <tr>
              <th className="p-2 text-left">Tracking</th>
              <th className="p-2 text-left">Sender</th>
              <th className="p-2 text-left">Addresses</th>
              <th className="p-2 text-left">Weight</th>
              <th className="p-2 text-left">Fee</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-background">
            {parcels.map(p => (
              <tr key={p._id} className="border-b">
                <td className="p-2">{p.trackingId}</td>
                <td className="p-2">
                  {p.sender?.name ? (
                    <span>{p.sender?.name}, Phone: {p.sender?.deliveryPhone}</span>
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
                  {p.currentStatus === "REQUESTED" && (
                    <button
                      onClick={() => handleClaim(p._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Claim
                    </button>
                  )}

                  {p.currentStatus === "DELIVERED" && (
                    p.ratings?.receiverToSender?.rating != null ? (
                      <span className="font-semibold text-green-400">
                        {p.ratings.receiverToSender.rating} ⭐
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedTrackingId(p.trackingId);
                          setShowRatingModal(true);
                        }}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Rate Sender
                      </button>
                    )
                  )}

                  {["DISPATCHED", "IN_TRANSIT"].includes(p.currentStatus) && (
                    <button
                      onClick={() => handleUpdateTracking(p.trackingId, "DELIVERED")}
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
      </div>
    </div>
  );
};

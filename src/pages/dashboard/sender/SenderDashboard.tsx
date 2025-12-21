/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import type { AuthUser } from "@/types/auth";
import type { Parcel, TParcelStatus } from "@/types/parcel";
import CreateParcel from "./CreateParcel";
import { toast } from "sonner";
import RatingModal from "./RatingModal";
import { ParcelService } from "./parcelService";
import { Button } from "@/components/ui/button";
import { SenderParcelChart } from "./SenderParcelChart";




const SenderDashboard = () => {
const user = useSelector(
  (state: RootState) => state.auth.user
) as AuthUser | null;

const [showCreateModal, setShowCreateModal] = useState(false);
const [parcelMeta, setParcelMeta] = useState<any>({});
console.log(parcelMeta)

const [showRatingModal, setShowRatingModal] = useState(false);
const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(null);



  const [parcels, setParcels] = useState<Parcel[]>([]);

  const [loading, setLoading] = useState(false);


  // 🚀 Load parcels on mount
useEffect(() => {
  const fetchParcels = async () => {
    setLoading(true);
    try {
      const response = await ParcelService.getMyParcelsSender();
        setParcels(response.data || []);
        setParcelMeta(response.meta);
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
    return <p className="flex flex-col text-background text-xl container mx-auto min-h-screen bg-chart-3 px-4 py-20 items-center justify-between gap-4">Loading parcels...</p>;
  }





  // 🚀 Cancel parcel
  const handleCancel = async (parcelId: string) => {
    try {
      await ParcelService.cancelParcel(parcelId);
      setParcels(prev =>
        prev.map(p => (p._id === parcelId ? { ...p, currentStatus: "CANCELLED" } : p))
      );
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 🚀 Update tracking (sender can only CANCELLED or RETURNED)
  const handleUpdateStatus = async (trackingId: string, status: TParcelStatus) => {
    try {
      await ParcelService.updateTrackingSender({ trackingId, currentStatus: status });
      setParcels(prev =>
        prev.map(p => (p.trackingId === trackingId ? { ...p, currentStatus: status } : p))
      );
    } catch (err: any) {
      alert(err.message);
    }
  };


  // 🚀 Give rating
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

      <div className="flex flex-col container mx-auto  px-4 py-20 items-center justify-between gap-4">
      <h1 className="text-3xl text-background font-bold mb-4">Sender Dashboard</h1>


      <div className="flex justify-center">
        <div className="w-full max-w-md">
          <SenderParcelChart meta={parcelMeta} />
        </div>
      </div>
      

      <button
        onClick={() => setShowCreateModal(true)}
        className="bg-primary  text-background px-4 py-2 rounded self-end"
      >
        + Create Parcel
      </button>

        <div className="flex flex-wrap gap-2 mt-5">
          <Button variant="outline">
            Total Parcels: {parcelMeta?.totalCount}
          </Button>
          <Button variant="outline">
            Approved Parcels: {parcelMeta?.approvedCount}
          </Button>
          <Button variant="outline">
            Delivered Parcels: {parcelMeta?.deliveredCount}
          </Button>
          <Button variant="outline">
            Returned Parcels: {parcelMeta?.dispatched}
          </Button>
          <Button variant="outline">
            Blocked Parcels: {parcelMeta?.inTransit}
          </Button>
          <Button variant="outline">
            Cancelled Parcels: {parcelMeta?.returnedCount}
          </Button>
          
          <Button variant="outline">
            Processing Parcels: {parcelMeta?.unclaimed}
          </Button>
          <Button variant="outline">
            Unclaimed Parcels: {parcelMeta?.cancelledCount}
          </Button>
          <Button variant="outline">
            Unclaimed Parcels: {parcelMeta?.blockedCount}
          </Button>
      </div>

      {parcels.length === 0 ? (
  <div className="flex flex-col items-center justify-center w-full py-20 text-xl text-gray-500">
    You have no parcels yet. Create one to get started!
  </div>
) : (

      <table className="w-full text-sm border border-collapse">
        <thead className="bg-muted text-sidebar-foreground">
          <tr className="text-center">
            <th className="p-2 text-left">
              <div className="flex items-center justify-center h-full">Receiver</div>
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
              <div className="flex items-center justify-center h-full">Action</div>
            </th>
          </tr>
        </thead>
        <tbody className="text-background">
          {parcels.map(p => 
            {
          return (
            
            <tr key={p._id} className="border-b ">
              <td className="p-2">
                {p.receiver?.name ? (
                  <span>{p.receiver?.name}, Phone: {p.receiver?.deliveryPhone}, 
                    {p.ratings?.receiverToSender?.rating ? (
                      <span className="text-yellow-400 font-semibold"> R.R: {p.ratings?.receiverToSender?.rating}⭐</span>
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
                      p.sender?.pickupAddress?.extra,
                      p.sender?.pickupAddress?.area,
                      p.sender?.pickupAddress?.postOffice,
                      p.sender?.pickupAddress?.district,
                      p.sender?.pickupAddress?.division,
                      " Phone:",
                      p.sender?.pickupPhone
                    ]
                  .filter(Boolean) // null/undefined বাদ দেবে
                  .join(", ")}
              </div>
                 <div className="text-xs">
                    Delivery: {[
                      p.sender?.deliveryAddress?.extra,
                      p.sender?.deliveryAddress?.area,
                      p.sender?.deliveryAddress?.postOffice,
                      p.sender?.deliveryAddress?.district,
                      p.sender?.deliveryAddress?.division,
                      " Phone:",
                      p.sender?.deliveryPhone
                    ]
                  .filter(Boolean) // null/undefined বাদ দেবে
                  .join(", ")}
              </div>
              </td>
              <td className="p-2">{p.weight} kg</td>
              <td className="p-2">৳ {p.fee}</td>
              <td className="p-2">{p.currentStatus}</td>
              <td className="p-2 flex gap-2">
                {(p.currentStatus == "REQUESTED" ||
                  p.currentStatus == "APPROVED" ) && (
                    <button
                      onClick={() => handleCancel(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}

                {(p.currentStatus === "DELIVERED") && (
                  p.ratings?.senderToReceiver?.rating != null ? (
                    <span className="font-semibold text-yellow-400">
                      {p.ratings.senderToReceiver.rating} ⭐
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

                {p.currentStatus === "DELIVERED" && (
                  <button
                    onClick={() => handleUpdateStatus(p.trackingId, "RETURNED")}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Mark Returned
                  </button>
                )}
              </td>
            </tr>
          )}
        )}
        </tbody>
      </table>
      )}

    {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background text-foreground p-6 rounded-md shadow-lg w-[500px]">
              
              <CreateParcel
                user={user}
                onClose={() => setShowCreateModal(false)}
                onCreated={(newParcel) => setParcels((prev) => [newParcel, ...prev])}
              />

          </div>
        </div>
      )}

        <RatingModal
          open={showRatingModal}
          onClose={() => setShowRatingModal(false)}
          onSubmit={handleRatingSubmit}
        />

      </div>
    </div>
  );
};

export default SenderDashboard;

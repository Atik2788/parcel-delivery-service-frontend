/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Parcel } from "@/types/parcel";
import type { AuthUser } from "@/types/auth";
import { toast } from "sonner";
import { ParcelService } from "./receiverService";

interface ClaimParcelModalProps {
  open: boolean;
  onClose: () => void;
  user: AuthUser | null;
  claimableParcels: Parcel[];
  setParcels: React.Dispatch<React.SetStateAction<Parcel[]>>;
}

const ClaimParcelModal = ({
  open,
  onClose,
  user,
  claimableParcels,
  setParcels,
}: ClaimParcelModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background text-foreground p-6 rounded-md shadow-lg w-4/5">
        <h2 className="text-xl font-bold mb-4">Claimable Parcels</h2>
        <table className="w-full text-sm border">
          <thead>
            <tr>
              <th className="p-2">Tracking</th>
              <th className="p-2">Sender</th>
              <th className="p-2">Pickup</th>
              <th className="p-2">Delivery</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Fee</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {claimableParcels.map(p => (
              <tr key={p._id} className="border-b">
                <td className="p-2">{p.trackingId}</td>
                <td className="p-2">{p.sender?.name}</td>

                      {/* Pickup address */}
                <td className="p-2 text-xs">
                  {[
                    p.sender?.pickupAddress?.extra,
                    p.sender?.pickupAddress?.area,
                    p.sender?.pickupAddress?.postOffice,
                    p.sender?.pickupAddress?.district,
                    p.sender?.pickupAddress?.division,
                    "Phone:",
                    p.sender?.pickupPhone
                  ]
                    .filter(Boolean) // null/undefined বাদ দেবে
                    .join(", ")}
                </td>

                {/* Delivery address */}
                <td className="p-2 text-xs">
                  {[
                    p.sender?.deliveryAddress?.extra,
                    p.sender?.deliveryAddress?.area,
                    p.sender?.deliveryAddress?.postOffice,
                    p.sender?.deliveryAddress?.district,
                    p.sender?.deliveryAddress?.division,
                    "Phone:",
                    p.sender?.deliveryPhone
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </td>

                <td className="p-2">{p.weight} kg</td>
                <td className="p-2">৳ {p.fee}</td>
                <td className="p-2">
                  <button
                    onClick={async () => {
                      try {
                        await ParcelService.claimParcel(p._id, {
                          name: user?.name || "Receiver",
                          receiverPhone: user?.phone || "N/A",
                        });

                        toast.success("Parcel claimed ✅");

                        setParcels(prev => [
                          ...prev,
                          { ...p, currentStatus: "DISPATCHED" },
                        ]);

                        onClose();
                      } catch (err: any) {
                        console.error("Claim error:", err);

                        toast.error(
                          err?.response?.data?.message ||
                          err.message ||
                          "Failed to claim parcel"
                        );
                      }
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Claim Parcel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClaimParcelModal;

import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onClose: () => void;
  payload: {
    trackingId: string;
    currentStatus: "IN_TRANSIT" | "DELIVERED";
  } | null;
  onSubmit: (data: {
    trackingId: string;
    currentStatus: "IN_TRANSIT" | "DELIVERED";
    location: string;
    note: string;
  }) => Promise<void>;
}

const TrackingUpdateModal = ({ open, onClose, payload, onSubmit }: Props) => {
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  if (!open || !payload) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-background shadow-xl rounded-lg p-4 w-[320px] z-50 border">
      <h3 className="font-semibold mb-2">
        Update to {payload.currentStatus}
      </h3>

      <input
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Location"
        className="w-full mb-2 px-2 py-1 border rounded"
      />

      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="Note"
        className="w-full mb-2 px-2 py-1 border rounded"
      />

      <div className="flex gap-2 justify-end">
        <button
          onClick={onClose}
          className="text-sm px-2 py-1 bg-blue-500"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!location) {
              toast.error("Location required");
              return;
            }

            await onSubmit({
              trackingId: payload.trackingId,
              currentStatus: payload.currentStatus,
              location,
              note,
            });

            setLocation("");
            setNote("");
            onClose();
          }}
          className="text-sm px-2 py-1 bg-blue-500 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TrackingUpdateModal;

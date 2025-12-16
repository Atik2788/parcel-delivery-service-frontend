/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/CreateParcel.tsx
import { useState } from "react";
import { ParcelService } from "@/pages/dashboard/sender/parcelService";
import type { AuthUser } from "@/types/auth";
import type { IParcelCreatePayload } from "@/types/parcel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  user: AuthUser;
  onClose: () => void;
  onCreated: (newParcel: any) => void;
};

const CreateParcel = ({ onClose, onCreated }: Props) => {
  const [form, setForm] = useState<IParcelCreatePayload>({
    type: "",
    weight: 0,
    deliveryDate: "",
    pickupPhone: "",
    deliveryPhone: "",
    pickupAddress: { division: "", area: "", postOffice: "", district: "", extra: "" },
    deliveryAddress: { division: "", area: "", postOffice: "", district: "", extra: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "pickupAddress" | "deliveryAddress"
  ) => {
    setForm({
      ...form,
      [field]: { ...(form as any)[field], [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await ParcelService.createParcel(form);
      onCreated(res.data);
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-4">
      {/* Basic fields */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Input id="type" name="type" value={form.type} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="weight">Weight</Label>
          <Input id="weight" name="weight" type="number" value={form.weight} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="deliveryDate">Delivery Date</Label>
          <Input
            id="deliveryDate"
            name="deliveryDate"
            type="date"
            value={form.deliveryDate}
            onChange={handleChange}
            min={new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]} 
            // ✅ আজকের পরের দিন থেকে শুরু হবে
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="pickupPhone">Pickup phone</Label>
          <Input id="pickupPhone" name="pickupPhone" value={form.pickupPhone} onChange={handleChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="deliveryPhone">Delivery phone</Label>
          <Input id="deliveryPhone" name="deliveryPhone" value={form.deliveryPhone} onChange={handleChange} />
        </div>
      </div>

      {/* Pickup address */}
      <div className="space-y-2">
        <Label>Pickup address</Label>
        <div className="grid grid-cols-2 gap-3">
          {["extra", "area", "postOffice", "district", "division"].map((key) => (
            <Input
              key={`pickup-${key}`}
              name={key}
              placeholder={key}
              value={(form.pickupAddress as any)[key] || ""}
              onChange={(e) => handleAddressChange(e, "pickupAddress")}
            />
          ))}
        </div>
      </div>

      {/* Delivery address */}
      <div className="space-y-2">
        <Label>Delivery address</Label>
        <div className="grid grid-cols-2 gap-3">
          {["extra", "area", "postOffice", "district", "division"].map((key) => (
            <Input
              key={`delivery-${key}`}
              name={key}
              placeholder={key}
              value={(form.deliveryAddress as any)[key] || ""}
              onChange={(e) => handleAddressChange(e, "deliveryAddress")}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </div>
    </div>
  );
};

export default CreateParcel;

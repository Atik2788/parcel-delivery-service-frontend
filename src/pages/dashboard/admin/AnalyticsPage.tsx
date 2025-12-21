import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserChart } from "./UserChart";
import { ParcelChart } from "./ParcelChart";

interface AnalyticsPageProps {
  userMeta: {
    totalUsers: number;
    senderCount: number;
    receiverCount: number;
    adminCount: number;
    superAdminCount: number;
  };
  parcelMeta: {
    totalParcels: number;
    deliveredParcels: number;
    pendingParcels: number;
    blockedParcels: number;
    inTransitParcels: number;
    cancelledParcels: number;
  };
}

export const AnalyticsPage = ({ userMeta, parcelMeta }: AnalyticsPageProps) => {
  const [activeTab, setActiveTab] = useState<"users" | "parcels">("users");

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Toggle Buttons */}
      <div className="flex gap-4">
        <Button
          variant={activeTab === "users" ? "default" : "outline"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </Button>
        <Button
          variant={activeTab === "parcels" ? "default" : "outline"}
          onClick={() => setActiveTab("parcels")}
        >
          Parcels
        </Button>
      </div>

      {/* Charts */}
      {activeTab === "users" ? (
        <UserChart meta={userMeta} />
      ) : (
        <ParcelChart meta={parcelMeta} />
      )}
    </div>
  );
};

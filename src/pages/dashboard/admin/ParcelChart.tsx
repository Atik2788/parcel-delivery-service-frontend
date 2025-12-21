/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export const ParcelChart = ({ meta }: { meta: any }) => {
  const chartRef = useRef<ChartJS | null>(null);

const data = {
  labels: ["Delivered", "Pending", "Blocked", "In Transit", "Cancelled"],
  datasets: [
    {
      data: [
        meta.deliveredParcels,
        meta.pendingParcels,
        meta.blockedParcels,
        meta.inTransitParcels,
        meta.cancelledParcels,
      ],
      backgroundColor: [
        "#10b981",
        "#3b82f6",
        "#ef4444",
        "#f59e0b",
        "#6b7280",
      ],
    },
  ],
};

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Pie
      data={data}
      ref={(ref) => {
        if (ref) chartRef.current = ref;
      }}
    />
  );
};

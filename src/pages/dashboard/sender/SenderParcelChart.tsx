/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export const SenderParcelChart = ({ meta }: { meta: any }) => {
  const chartRef = useRef<ChartJS | null>(null);

const data = {
  labels: ["Approved", "Delivered", "Dispatched", "In Transit", "Returned", "Unclaimed", "Cancelled", "Blocked"],
  datasets: [
    {
      data: [
        meta?.approvedCount,
        meta?.deliveredCount,
        meta?.dispatched,
        meta?.inTransit,
        meta?.returnedCount,
        meta?.unclaimed,
        meta?.cancelledCount,
        meta?.blockedCount,
      ],
      backgroundColor: [
        "#10b981",
        "#3b82f6",
        "#ef4444",
        "#f59e0b",
        "#6b7280",
        "#8b5cf6",
        "#f43f5e",
        "#64748b",
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

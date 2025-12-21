/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import { Chart as ChartJS } from "chart.js/auto";

export const ReceiverParcelChart = ({ meta }: { meta: any }) => {
  const chartRef = useRef<ChartJS | null>(null);

const data = {
  labels: ["Delivered", "Dispatched", "In Transit", "Returned", "Blocked"],
  datasets: [
    {
      data: [
        meta?.deliveredCount, 
        meta?.dispatched,
        meta?.inTransit,
        meta?.returned,
        meta?.blocked,
      ],
      backgroundColor: [
        "#10b981",
        "#3b82f6",
        "#f59e0b",
        "#6b7280",
        "#ef4444",
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

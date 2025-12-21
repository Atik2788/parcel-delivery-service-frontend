/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";

export const UserChart = ({ meta }: { meta: any }) => {
  if (!meta) return null;

  const data = {
    labels: ["Super Admin", "Admin", "Sender", "Receiver"],
    datasets: [
      {
        label: "User Count",
        data: [
          meta.superAdminCount,
          meta.adminCount,
          meta.senderCount,
          meta.receiverCount,
        ],
        backgroundColor: [
          "#ef4444", // Super Admin
          "#f59e0b", // Admin
          "#3b82f6", // Sender
          "#10b981", // Receiver
        ],
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="bg-card p-4 rounded-md shadow h-72">
      <h3 className="text-sm font-semibold mb-3 text-muted-foreground">
        User Distribution
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
};

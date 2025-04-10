import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartComponent = ({ weeklyData, monthlyData, title = "Bar Chart" }) => {
  const [view, setView] = useState("weekly");
  const data = view === "weekly" ? weeklyData : monthlyData;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#4B5563" },
      },
      x: {
        ticks: { color: "#4B5563" },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="space-x-2">
          <button
            variant={view === "weekly" ? "default" : "outline"}
            onClick={() => setView("weekly")}
          >
            Weekly
          </button>
          <button
            variant={view === "monthly" ? "default" : "outline"}
            onClick={() => setView("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <Bar data={data} options={chartOptions} />
    </div>
  );
};

export default BarChartComponent;

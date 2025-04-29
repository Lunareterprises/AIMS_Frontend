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

// Registering the necessary components for the chart
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChartComponent = ({
  weeklyData,
  monthlyData,
  title = "Bar Chart",
}) => {
  const [view, setView] = useState("weekly");
  const data = view === "weekly" ? weeklyData : monthlyData;

  // Chart options to customize the bar chart
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
    elements: {
      bar: {
        // This controls the thickness of bars
        barThickness: 20, // You can adjust this value
      },
    },
    // Optional: to limit the maximum bar thickness
    maxBarThickness: 30, // Adjust as needed to control the maximum bar size
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <div className="space-x-2">
          <button
            className={
              view === "weekly p-3"
                ? "bg-blue-500 text-white p-3"
                : "bg-transparent border border-blue-500 p-3 text-blue-500"
            }
            onClick={() => setView("weekly")}
          >
            Weekly
          </button>
          <button
            className={
              view === "monthly"
                ? "bg-blue-500 text-white p-3"
                : "bg-transparent border p-3 border-blue-500 text-blue-500"
            }
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

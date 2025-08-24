"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Chart = ({ selectedType, setSelectedType }) => {
  // Dummy data grouped by day
  const data = [
    { date: "Aug 1", income: 5000, expense: 2000 },
    { date: "Aug 2", income: 3000, expense: 1200 },
    { date: "Aug 3", income: 4000, expense: 2500 },
    { date: "Aug 4", income: 6000, expense: 1800 },
    { date: "Aug 5", income: 2000, expense: 3000 },
    { date: "Aug 6", income: 4500, expense: 1500 },
    { date: "Aug 7", income: 3500, expense: 2200 },
  ];

  return (
    <div className="h-96 mt-10 mb-24 mx-10 lg:mx-auto">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setSelectedType("expense")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            selectedType === "expense" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Expenses
        </button>
        <button
          onClick={() => setSelectedType("income")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            selectedType === "income" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Income
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          {selectedType === "expense" ? (
            <Bar dataKey="expense" fill="#f44336" />
          ) : (
            <Bar dataKey="income" fill="#4caf50" />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
"use client";

import { useState } from "react";
import SummaryCard from "./../components/dashboard/summary-card.jsx";
import Chart from "./../components/dashboard/chart.jsx";
import TransactionsList from "../components/dashboard/recenttransactions.jsx";

const Dashboard = () => {
  // Lifted state: controls selected chart type
  const [selectedType, setSelectedType] = useState("expense"); // default is expense

  return (
    <div className="rounded-lg mx-2 md:mx-20 lg:mx-30 my-2 py-4 lg:px-8">
      {/* Header */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-lg mt-1">Welcome to your financial overview</p>
      </div>

      {/* Summary cards */}
      <SummaryCard />

      {/* Chart */}
      <Chart selectedType={selectedType} setSelectedType={setSelectedType} />

      {/* Transactions List */}
      <TransactionsList selectedType={selectedType} />
    </div>
  );
};

export default Dashboard;
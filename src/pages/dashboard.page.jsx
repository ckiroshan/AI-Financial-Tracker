import { useState } from "react";
import SummaryCard from "./../components/dashboard/summary-card.jsx";
import Chart from "./../components/dashboard/chart.jsx";
import TransactionsList from "../components/dashboard/recent-transactions.jsx";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { MonthYearPicker } from "@/components/transactions/month-year-picker.jsx";

const Dashboard = () => {
  // Lifted state: controls selected chart type
  const [selectedType, setSelectedType] = useState("expense"); // default is expense
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // default: date now

  return (
    <div className="rounded-lg mx-2 md:mx-20 lg:mx-30 my-2 py-4 lg:px-8">
      {/* Header */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-lg mt-1">Welcome to your financial overview</p>
      </div>
      {/* Date Picker + Report Button */}
      <div className="flex items-stretch justify-between mb-1 lg:mb-3">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Stats</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="md:text-base px-4">
            <Download />
            Report
          </Button>
          <MonthYearPicker selectedMonth={selectedMonth} onChange={setSelectedMonth} />
        </div>
      </div>

      {/* Summary cards */}
      <SummaryCard selectedMonth={selectedMonth} />

      {/* Chart */}
      <Chart selectedType={selectedType} setSelectedType={setSelectedType} />

      {/* Transactions List */}
      <TransactionsList  selectedMonth={selectedMonth} selectedType={selectedType} />
    </div>
  );
};

export default Dashboard;
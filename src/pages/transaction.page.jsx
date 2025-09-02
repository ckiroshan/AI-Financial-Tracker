import { useState } from "react";
import Transactions from "./../components/transactions/transactions.jsx";
import { MonthYearPicker } from "@/components/transactions/month-year-picker.jsx";

const TransactionsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(null); // Month filter

  return (
    <div className="rounded-lg mx-2 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8">
      <div className="px-6 pb-4 flex flex-wrap items-center gap-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Current Transactions</h1>
        <MonthYearPicker selectedMonth={selectedMonth} onChange={setSelectedMonth} />
      </div>
      <Transactions selectedMonth={selectedMonth} />
    </div>
  );
};

export default TransactionsPage;

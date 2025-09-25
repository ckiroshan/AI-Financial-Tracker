import { useState } from "react";
import Transactions from "./../components/transactions/transactions.jsx";
import { MonthYearPicker } from "@/components/transactions/month-year-picker.jsx";
import ActionButtons from "@/components/transactions/action-buttons/action-buttons.jsx";
import ReceiptsCarousel from "@/components/transactions/receipt/receipt-carousel.jsx";
import CategoryList from "@/components/transactions/category/category-list.jsx";

const TransactionsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date()); // default: date now
  const [refreshKey, setRefreshKey] = useState(0); // trigger re-fetch

  return (
    <div className="rounded-lg mx-4 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8">
      <ActionButtons onCreated={() => setRefreshKey(k => k + 1)} />
      <div className="pb-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Transactions</h1>
        {/* Month, Year selector */}
        <MonthYearPicker selectedMonth={selectedMonth} onChange={setSelectedMonth} />
      </div>
      <Transactions selectedMonth={selectedMonth} refreshKey={refreshKey} setRefreshKey={setRefreshKey} />
      {/* Receipts Section */}
      <div className="mt-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Receipts</h2>
        <ReceiptsCarousel refreshKey={refreshKey} />
      </div>
      {/* Categories Section */}
      <div className="mt-18">
        <h2 className="text-xl lg:text-2xl font-bold mb-1">Categories</h2>
        <p className="mb-4 lg:text-lg">This shows a list of categories that can be filtered as follows.</p>
        <CategoryList refreshKey={refreshKey} setRefreshKey={setRefreshKey}/>
      </div>
    </div>
  );
};

export default TransactionsPage;

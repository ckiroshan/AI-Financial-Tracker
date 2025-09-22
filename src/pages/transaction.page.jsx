import { useState } from "react";
import Transactions from "./../components/transactions/transactions.jsx";
import { MonthYearPicker } from "@/components/transactions/month-year-picker.jsx";
import ActionButtons from "@/components/transactions/action-buttons/action-buttons.jsx";
import ReceiptsCarousel from "@/components/transactions/receipt/receipt-carousel.jsx";
import CategoryList from "@/components/transactions/category/category-list.jsx";

const allReceipts = [
  { merchantName: "PEOPLE'S BANK", amountDetected: 3500, context: "Cardless Deposit", transactionDate: "2024-02-25T07:59:23.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "68b21c7ae4fe6b8236c9ac61" },
  { merchantName: "COOL PLANET", amountDetected: -5975, context: "Mens accessories, shirt, cufflinks", transactionDate: "2024-03-02T11:15:45.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "a1f4b2c3d4e5f67890123456" },
  { merchantName: "Keells Super", amountDetected: -9200, context: "Weekly groceries and household items", transactionDate: "2024-03-05T15:42:10.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "b2c3d4e5f67890123456a1f4" },
  { merchantName: "ABC Technologies Pvt Ltd", amountDetected: 125000, context: "Monthly salary credited", transactionDate: "2024-03-01T09:00:00.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "c3d4e5f67890123456a1f4b2" },
  { merchantName: "Upwork", amountDetected: 15000, context: "Freelance web development project", transactionDate: "2024-03-10T13:25:30.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "d4e5f67890123456a1f4b2c3" },
  { merchantName: "Ministry of Crab", amountDetected: -4500, context: "Dinner date and drinks", transactionDate: "2024-03-08T19:15:00.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "e5f67890123456a1f4b2c3d4" },
  { merchantName: "PickMe", amountDetected: -2750, context: "Taxi rides for client meetings", transactionDate: "2024-03-09T08:40:00.000Z", fileUrl: "https://placehold.co/600x400", isProcessed: true, id: "f67890123456a1f4b2c3d4e5" },
];

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
        <ReceiptsCarousel receipts={allReceipts} />
      </div>
      {/* Categories Section */}
      <div className="mt-18">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">Categories</h2>
        <CategoryList/>
      </div>
    </div>
  );
};

export default TransactionsPage;

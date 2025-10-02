import Transactions from "./../components/transactions/transactions.jsx";
import { MonthYearPicker } from "@/components/transactions/month-year-picker.jsx";
import ActionButtons from "@/components/transactions/action-buttons/action-buttons.jsx";
import ReceiptsCarousel from "@/components/transactions/receipt/receipt-carousel.jsx";
import CategoryList from "@/components/transactions/category/category-list.jsx";

const TransactionsPage = () => {
  return (
    <div className="rounded-lg mx-4 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8">
      {/* Form Modal buttons */}
      <ActionButtons />
      {/* Transaction list Section */}
      <div className="mb-3 lg:mb-1 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Transactions</h1>
        <MonthYearPicker /> {/* Month, Year selector */}
      </div>
      <Transactions />
      {/* Receipts Section */}
      <div className="mt-10">
        <h2 className="text-xl lg:text-2xl font-bold mb-1">Receipts</h2>
        <p className="text-justify mb-4 lg:text-lg">This shows a list of receipts. you have processed & not processed yet. </p>
        <ReceiptsCarousel />
      </div>
      {/* Categories Section */}
      <div className="mt-18">
        <h2 className="text-xl lg:text-2xl font-bold mb-1">Categories</h2>
        <p className="mb-4 lg:text-lg">This shows a list of categories that can be filtered as follows.</p>
        <CategoryList />
      </div>
    </div>
  );
};

export default TransactionsPage;

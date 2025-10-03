import { useState } from "react";
import BudgetSummary from "../components/budget/budget-summary";
import BudgetFilters from "../components/budget/budget-filters";
import BudgetDisplay from "../components/budget/budget-display";
import { AddBudgetModal } from "../components/budget/add-budget-model";
import { MonthYearPicker } from "@/components/transactions/month-year-picker";
import { SquarePen, Trash2 } from "lucide-react";

const BudgetPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([
    {
      id: "b1",
      name: "Monthly Groceries",
      limitAmount: 25000,
      startDate: "2025-09-01T00:00:00.000Z",
      endDate: "2025-09-30T23:59:59.999Z",
      isActive: true,
      category: { id: "cat1", name: "Food & Dining", type: "expense" },
      remainingAmount: 5000,
      spendingPercentage: 0.8,
      isCloseToLimit: false,
    },
    {
      id: "b2",
      name: "Entertainment",
      limitAmount: 10000,
      startDate: "2025-07-01T00:00:00.000Z",
      endDate: "2025-08-31T23:59:59.999Z",
      isActive: true,
      category: { id: "cat2", name: "Entertainment", type: "expense" },
      remainingAmount: 3000,
      spendingPercentage: 0.7,
      isCloseToLimit: false,
    },
    {
      id: "b3",
      name: "Transportation",
      limitAmount: 12000,
      startDate: "2025-01-01T00:00:00.000Z",
      endDate: "2025-01-31T23:59:59.999Z",
      isActive: true,
      category: { id: "cat3", name: "Transportation", type: "expense" },
      remainingAmount: 80,
      spendingPercentage: 0.99,
      isCloseToLimit: true,
    },
    {
      id: "b4",
      name: "Holiday Shopping",
      limitAmount: 25000,
      startDate: "2025-08-01T00:00:00.000Z",
      endDate: "2025-08-31T23:59:59.999Z",
      isActive: false, // completed
      category: { id: "cat4", name: "Shopping", type: "expense" },
      remainingAmount: 0,
      spendingPercentage: 1,
      isCloseToLimit: true,
    },
    {
      id: "b5",
      name: "Home Improvement",
      limitAmount: 30000,
      startDate: "2025-01-15T00:00:00.000Z",
      endDate: "2025-03-15T23:59:59.999Z",
      isActive: true,
      category: { id: "cat5", name: "Home", type: "expense" },
      remainingAmount: -5000, // overspent
      spendingPercentage: 1.16,
      isCloseToLimit: true,
    },
  ]);

  const handleAddBudget = (newBudget) => {
    const budget = {
      ...newBudget,
      id: `b${budgets.length + 1}`,
      isActive: true,
      remainingAmount: newBudget.limitAmount,
      spendingPercentage: 0,
      isCloseToLimit: false,
    };
    setBudgets([...budgets, budget]);
    setIsAddModalOpen(false);
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  return (
    <div className="rounded-lg mx-4 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8">
      <div className="flex justify-between items-center mb-4 lg:mb-1">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Budget Overview</h1>
        <MonthYearPicker />
      </div>
        <p className="text-base lg:text-lg text-center mb-1 lg:mb-4">Summary of your current Budget Stats (Rs)</p>
      {/* Summary Cards */}
      <BudgetSummary budgets={budgets} />
      
      {/* Edit Banner */}
      <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">Budget list</h1>
      <p className="mb-3 text-base lg:text-lg ">View all your current budgets here.</p>
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2 md:p-3 lg:p-4 text-sm text-yellow-900  flex items-center gap-1.5 lg:text-base">
        <span>You can:</span>
        <span className="text-background bg-yellow-300 hover:bg-yellow-700 p-1 rounded-md">
          <SquarePen className="size-4" />
        </span>
        <strong>Edit</strong> or
        <span className="text-background bg-red-400 p-1 rounded-md" disabled>
          <Trash2 className="size-4" />
        </span>
        <strong>Delete</strong>
        <span>each entry as needed.</span>
      </div>
            
      {/* Filters and Search */}
      <BudgetFilters 
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      {/* Budget Display */}
      <BudgetDisplay 
        filterStatus={filterStatus}
        searchQuery={searchQuery}
        budgets={budgets}
        setBudgets={setBudgets}
        onDelete={handleDeleteBudget}
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      {/* Add Budget Modal */}
      <AddBudgetModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSubmit={handleAddBudget}
      />
    </div>
  );
};

export default BudgetPage;


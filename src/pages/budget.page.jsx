"use client";

import { useState } from "react";
import BudgetSummary from "../components/budget/budject-summary";
import BudgetFilters from "../components/budget/budget-filters";
import BudgetDisplay from "../components/budget/budget-display";
import { AddBudgetModal } from "../components/budget/add-budget-model";
import { DateRangePicker } from "@/components/budget/date-range-picker";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const BudgetPage = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      name: "Monthly Groceries",
      amount: 25000,
      spent: 20000,
      category: "Food & Dining",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      status: "active",
    },
    {
      id: 2,
      name: "Entertainment",
      amount: 10000,
      spent: 7000,
      category: "Entertainment",
      startDate: "2025-07-01",
      endDate: "2025-08-31",
      status: "active",
    },
    {
      id: 3,
      name: "Transportation",
      amount: 12000,
      spent: 12000,
      category: "Transportation",
      startDate: "2025-01-01",
      endDate: "2025-01-31",
      status: "active",
    },
    {
      id: 4,
      name: "Holiday Shopping",
      amount: 25000,
      spent: 24500,
      category: "Shopping",
      startDate: "2025-08-01",
      endDate: "2025-08-31",
      status: "completed",
    },
    {
      id: 5,
      name: "Home Improvement",
      amount: 30000,
      spent: 35000,
      category: "Home",
      startDate: "2025-01-15",
      endDate: "2025-03-15",
      status: "active",
    },
  ]);

  const handleAddBudget = (newBudget) => {
    const budget = {
      ...newBudget,
      id: budgets.length + 1,
      spent: 0,
      status: "active",
    };
    setBudgets([...budgets, budget]);
    setIsAddModalOpen(false);
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id));
  };

  return (
    <div className="rounded-lg mx-4 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8">
      
      {/* Summary Cards */}
      <BudgetSummary budgets={budgets} />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
        Budget
        </h1>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          Budget
        </Button>
      </div>
      
      {/* Filters and Search */}
      <BudgetFilters 
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsAddModalOpen={setIsAddModalOpen}
      />

      <DateRangePicker />
      
      {/* Budget Display */}
      <BudgetDisplay 
        filterStatus={filterStatus}
        searchQuery={searchQuery}
        budgets={budgets}
        onDelete={handleDeleteBudget}
      />

      {/* Add Budget Modal */}
      <AddBudgetModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddBudget}
      />
    </div>
  );
};

export default BudgetPage;


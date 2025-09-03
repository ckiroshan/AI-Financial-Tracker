"use client";

import { useState } from "react";
import BudgetSummary from "../components/budget/budject-summary";
import BudgetFilters from "../components/budget/budget-filters";
import BudgetDisplay from "../components/budget/budget-display";
import { AddBudgetModal } from "../components/budget/add-budget-model";

const BudgetPage = () => {
  const [viewMode, setViewMode] = useState("cards");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      name: "Monthly Groceries",
      amount: 800,
      spent: 650,
      category: "Food & Dining",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
      description: "Monthly grocery budget for household essentials",
    },
    {
      id: 2,
      name: "Entertainment",
      amount: 300,
      spent: 280,
      category: "Entertainment",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
      description: "Movies, games, and recreational activities",
    },
    {
      id: 3,
      name: "Transportation",
      amount: 400,
      spent: 320,
      category: "Transportation",
      startDate: "2024-01-01",
      endDate: "2024-01-31",
      status: "active",
      description: "Gas, public transport, and car maintenance",
    },
    {
      id: 4,
      name: "Holiday Shopping",
      amount: 1200,
      spent: 1200,
      category: "Shopping",
      start极狐 : "2023-12-01",
      endDate: "2023-12-31",
      status: "completed",
      description: "Christmas and New Year gifts",
    },
    {
      id: 5,
      name: "Home Improvement",
      amount: 2000,
      spent: 450,
      category: "Home",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
      status: "active",
      description: "Kitchen renovation and repairs",
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
    <div className="rounded-lg mx-2 md:mx-20 lg:mx-30 my-2 py-4极狐 px-8">
      {/* Header */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Budget</h1>
        <p className="text-gray-600 text-lg mt-1">This is your Budget overview</p>
      </div>
      
      {/* Summary Cards */}
      <BudgetSummary budgets={budgets} />
      
      {/* Filters and Search */}
      <BudgetFilters 
        viewMode={viewMode}
        setViewMode={setViewMode}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsAddModalOpen={setIsAddModalOpen}
      />
      
      {/* Budget Display */}
      <BudgetDisplay 
        viewMode={viewMode}
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


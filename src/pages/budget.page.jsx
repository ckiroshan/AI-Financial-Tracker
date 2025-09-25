"use client";

import { useEffect, useState } from "react";
import BudgetSummary from "../components/budget/budject-summary";
import BudgetFilters from "../components/budget/budget-filters";
import BudgetDisplay from "../components/budget/budget-display";
import { AddBudgetModal } from "../components/budget/add-budget-model";
import { DateRangePicker } from "@/components/budget/date-range-picker";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {useApi} from "@/api";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetPage = () => {
  const { getProtectedData } = useApi();

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true); 
      try {
        const data = await getProtectedData("budgets");
        setBudgets(data);
      } catch (err) {
        console.error("Failed to fetch budgets", err);
      } finally {
        setLoading(false); 
      }
    };
    fetchBudgets();
  }, []);



  const handleAddBudget = async (newBudget) => {
    try {
      const token=await getToken();
      const response = await fetch("http://localhost:8000/api/budgets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },  
        body: JSON.stringify(newBudget),
      });
      if (!response.ok) {
        throw new Error("Failed to add budget");
      }
      const createdBudget = await response.json();
      setBudgets([...budgets, createdBudget]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteBudget = async (id) => {
    try {
      const token=await getToken(); 
      const response = await fetch(`http://localhost:8000/api/budgets/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete budget");
      }
      setBudgets(budgets.filter((b) => b.id !== id));
    }
    catch (err) {
      console.error(err);
    } 
  };

  if (loading) {
    return (
      <Skeleton className="h-10 w-1/3 mx-4 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8 rounded-lg" />
    );
  } 
  

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


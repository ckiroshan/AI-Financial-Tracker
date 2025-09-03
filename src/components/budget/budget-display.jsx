"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import BudgetCard from "./budget-card";
import { BudgetTable } from "./budget-table";
import { Plus } from "lucide-react";

const BudgetDisplay = ({ viewMode, filterStatus, searchQuery, budgets, onDelete }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;

  // Apply filters based on filterStatus and searchQuery
  const filteredBudgets = budgets.filter((budget) => {
    const matchesStatus = filterStatus === "all" || budget.status === filterStatus;
    const matchesSearch =
      budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      budget.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBudgets.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const paginatedBudgets = filteredBudgets.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div>
      {viewMode === "cards" ? (
        <div className="space 6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBudgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} onDelete={onDelete} />
            ))}
          </div>

          {filteredBudgets.length > cardsPerPage && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + cardsPerPage, filteredBudgets.length)} of{" "}
                {filteredBudgets.length} budgets
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <BudgetTable budgets={filteredBudgets} onDelete={onDelete} />
      )}

      {filteredBudgets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No budgets found matching your criteria.</p>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="outline"
            className="mt-4 border-green-600 text-green-600 hover:bg-green-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Budget
          </Button>
        </div>
      )}
    </div>
  );
};

export default BudgetDisplay;
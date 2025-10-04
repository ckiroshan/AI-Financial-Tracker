import { useState } from "react";
import { Button } from "@/components/ui/button";
import BudgetCard from "./budget-card";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { AddBudgetModal } from "./add-budget-model";
import { useUIStore } from "@/stores/uiStore";
import { useCreateBudget, useDeleteBudget, useUpdateBudget } from "@/hooks/useBudgets";
import { useBudgetUIStore } from "@/stores/budgetUIStore";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetDisplay = ({ budgets, isLoading }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 3; // how many cards per page

  // Edit & Delete confirmation state
  const [editBudget, setEditBudget] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Global filters
  const { selectedMonth } = useUIStore();
  const { filterStatus, searchQuery, isAddModalOpen, setIsAddModalOpen } = useBudgetUIStore();

  // React Query hooks
  const createBudget = useCreateBudget();
  const updateBudget = useUpdateBudget();
  const deleteBudget = useDeleteBudget();

  // Apply filters
  const filteredBudgets = (budgets || []).filter((budget) => {
    // Month filter
    if (selectedMonth) {
      const start = new Date(budget.startDate);
      if (
        start.getFullYear() !== selectedMonth.getFullYear() ||
        start.getMonth() !== selectedMonth.getMonth()
      ) {
        return false;
      }
    }

    // Status filter
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && budget.isActive) ||
      (filterStatus === "completed" && !budget.isActive);

    // Search filter
    const categoryName = budget.category?.name?.toLowerCase() || "";
    const matchesSearch =
      budget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categoryName.includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBudgets.length / pageSize);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const paginatedBudgets = filteredBudgets.slice(start, end);

  // Handle create/update
  const handleSubmit = async (payload) => {
    try {
      if (payload.id) {
        await updateBudget.mutateAsync(payload);
      } else {
        await createBudget.mutateAsync(payload);
      }
      setIsAddModalOpen(false);
      setEditBudget(null);
    } catch (err) {
      console.error("Failed to save budget", err);
    }
  };

  // Trigger delete dialog
  const handleDelete = (budget) => {
    setBudgetToDelete(budget);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!budgetToDelete) return;
    try {
      setIsSubmitting(true);
      await deleteBudget.mutateAsync(budgetToDelete.id);
      setDeleteDialogOpen(false);
      setBudgetToDelete(null);
    } catch (err) {
      console.error("Failed to delete budget", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="space 6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? 
              Array.from({ length: pageSize }).map((_, i) => (
                <div key={i} className="rounded-xl border border-gray-200 p-4 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-32 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              ))
            : paginatedBudgets.map((budget) => <BudgetCard key={budget.id} budget={budget} onDelete={() => handleDelete(budget)} onEdit={() => setEditBudget(budget)} />)}
        </div>

        {/* Pagination controls */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            {/* Prev */}
            <Button variant="outline" size="sm" onClick={() => setPageIndex((p) => Math.max(p - 1, 0))} 
            disabled={pageIndex === 0}>
              Prev
            </Button>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} size="sm" onClick={() => setPageIndex(i)} 
              variant={pageIndex === i ? "default" : "outline"} >
                {i + 1}
              </Button>
            ))}

            {/* Next */}
            <Button variant="outline" size="sm" disabled={pageIndex === totalPages - 1}
            onClick={() => setPageIndex((p) => Math.min(p + 1, totalPages - 1))}>
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!isLoading && filteredBudgets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Couldn't find any budgets yet.</p>
          <Button onClick={() => setIsAddModalOpen(true)} title="Add Budget" className="mt-4">
            <PlusCircle className="w-4 h-4" /> Create One Now!
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <span className="font-semibold">{budgetToDelete?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AddBudgetModal
        isOpen={!!editBudget || isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditBudget(null);
        }}
        initialData={editBudget}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default BudgetDisplay;
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquareCheck, SquarePen, Trash2, ArrowDownCircle, ArrowUpCircle, Loader2 } from "lucide-react";
import CategoryModal from "../action-buttons/category-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useAllCategories, useDeleteCategory } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryList() {
  const { data: categories = [], isLoading } = useAllCategories();
  const deleteCategory = useDeleteCategory();
  const { filter, setFilter, editMode, toggleEditMode } = useCategoryStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for the edit/delete modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPrefill, setEditPrefill] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Filter categories based on filter state
  const filteredCategories = filter 
    ? categories.filter((category) => category.type === filter) 
    : categories;
  console.log(filteredCategories);

  // Form Edit Handler
  const handleEdit = (category) => {
    setEditPrefill(category);
    console.log(category);
    setEditModalOpen(true);
  };

  // Form Delete Handler
  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // Asynchronous Delete function
  const confirmDelete = async (category) => {
    if (!categoryToDelete) return;
    try {
      setIsSubmitting(true);
      await deleteCategory.mutateAsync(categoryToDelete.id);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      console.error("Failed to delete category", err);
    } finally {
      setIsSubmitting(false); // stop local loading
    }
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        {/* All */}
        <Button onClick={() => setFilter(null)} variant="outline" className={filter === null ? "bg-gray-200 text-gray-900" : ""}>
          All
        </Button>

        {/* Income */}
        <Button onClick={() => setFilter("income")} variant="outline" className={filter === "income" ? "bg-primary text-primary-foreground" : ""}>
          Income
        </Button>

        {/* Expense */}
        <Button onClick={() => setFilter("expense")} variant="outline" className={filter === "expense" ? "bg-red-500 text-white" : ""}>
          Expense
        </Button>

        {/* Edit Mode Toggle Button */}
        <Button onClick={toggleEditMode}  variant="outline" className={editMode ? "bg-gray-200 text-gray-900" : ""}>
          {editMode ? <SquareCheck /> : <SquarePen />}
          {editMode ? "Done" : "Edit"}
        </Button>
      </div>
      
      {/* Edit Mode Information Banner */}
      {editMode && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2 md:p-3 lg:p-4 text-sm text-yellow-900 flex items-center gap-1.5 md:gap-3 lg:text-base">
          <span>You can:</span>
          <span className="text-background bg-yellow-300 hover:bg-yellow-700 p-1 rounded-md">
            <SquarePen className="size-4" />
          </span>
          <strong>Edit</strong> or
          <span className="text-background bg-red-400 p-1 rounded-md" disabled>
            <Trash2 className="size-4" />
          </span>
          <strong>Delete</strong>
          <span>each category as needed.</span>
        </div>
      )}

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {isLoading ? (
          // Render 9 skeleton cards
          Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="shadow-sm rounded-4xl px-2 md:px-4 py-3 flex flex-col justify-between border border-gray-200 bg-gray-50" >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-25 md:w-40" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
          ))
        ) : (
          filteredCategories.map((category) => (
            <div key={category.id} className="shadow-sm rounded-4xl px-2 md:px-4 py-3 flex flex-col justify-between">
              {/* Top row: name + type badge */}
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm md:text-base truncate">{category.name}</span>
                {category.type === "income" 
                  ? <ArrowUpCircle className="text-green-500 size-5 md:size-6 flex-shrink-0" /> 
                  : <ArrowDownCircle className="text-red-500 size-5 md:size-6 flex-shrink-0" />}
              </div>

              {/* Edit/Delete icons (only visible in edit mode) */}
              {editMode && (
                <div className="flex justify-end gap-2 mt-3 mr-1 md:mr-0">
                  <Button className="text-background bg-yellow-400 hover:bg-yellow-700 size-7" onClick={() => handleEdit(category)}>
                    <SquarePen className="size-5" />
                  </Button>
                  <Button variant="destructive" className="size-7 text-background" onClick={() => handleDelete(category)}>
                    <Trash2 className="size-5" />
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Category edit modal */}
      <CategoryModal open={editModalOpen} onClose={() => setEditModalOpen(false)} prefill={editPrefill} />

      {/* Delete confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              Are you sure you want to delete this category?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

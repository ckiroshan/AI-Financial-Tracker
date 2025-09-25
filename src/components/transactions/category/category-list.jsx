import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { SquareCheck, SquarePen, Trash2, ArrowDownCircle, ArrowUpCircle, Trash } from "lucide-react";
import { useApi } from "@/api";
import CategoryModal from "../action-buttons/category-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

export default function CategoryList({ refreshKey, setRefreshKey }) {
  const { getProtectedData, putProtectedData, deleteProtectedData } = useApi(); // Custom hook to handle API calls
  const [categories, setCategories] = useState([]); // Store categories
  const [filter, setFilter] = useState(null); // null = show all
  const [editMode, setEditMode] = useState(false); // Manage edit mode state
  const [loading, setLoading] = useState(true); // Manage loading state

  // States for the edit/delete modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPrefill, setEditPrefill] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const data = await getProtectedData("categories");
        setCategories(data);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [refreshKey]); // Re-run when refreshKey changes

  // Filter categories based on filter state
  const filteredCategories = filter ? categories.filter((category) => category.type === filter) : categories;
  console.log(filteredCategories);

  // Form Edit Handler
  const handleEdit = (category) => {
    const prefill = { ...category };
    setEditPrefill(prefill);
    console.log(prefill);
    setEditModalOpen(true);
  };

  // Form Delete Handler
  const handleDelete = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // Asynchronous Delete function
  const confirmDelete = async (category) => {
    try {
      await deleteProtectedData(`categories/${categoryToDelete.id}`);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
      // Trigger refresh
      setCategories((prev) => prev.filter(category => category.id !== categoryToDelete.id));
    } catch (err) {
      console.error("Failed to delete category", err);
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
        <Button onClick={() => setEditMode((prev) => !prev)} variant="outline" className={editMode ? "bg-gray-200 text-gray-900" : ""}>
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
        {filteredCategories.map((category) => (
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
        ))}
      </div>

      {/* Category edit modal */}
      <CategoryModal open={editModalOpen} onClose={() => setEditModalOpen(false)} prefill={editPrefill}  
      onCreated={() => setRefreshKey(k => k + 1)} categories={categories}/>

      {/* Delete confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              Are you sure you want to delete this transaction?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

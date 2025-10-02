import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./table-columns";
import { Button } from "../ui/button";
import { LayoutGrid, SquareCheck, SquarePen, Table as TableIcon, Trash2 } from "lucide-react";
import ViewCardList from "./card-view-list";
import { Input } from "../ui/input";
import TransactionModal from "./action-buttons/transaction-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useUIStore } from "@/stores/uiStore";
import { useDeleteTransactions, useTransactions } from "@/hooks/useTransactions";

function Transactions() {
  const { selectedMonth } = useUIStore();
  const month = selectedMonth.getMonth() + 1;
  const year = selectedMonth.getFullYear();
  
  const {
    data: transactions = [], 
    isLoading,
    isError,
  } = useTransactions(month, year);
  const deleteMutation = useDeleteTransactions();

  const [viewMode, setViewMode] = useState("table"); // Toggles data-table / card-list
  const [editMode, setEditMode] = useState(false); // Toggles edit mode
  const [isMobile, setIsMobile] = useState(false); // Toggles mobile mode
  const [searchTerm, setSearchTerm] = useState(""); // Search input state 

  // Edit/Delete states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPrefill, setEditPrefill] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) setViewMode("cards"); // Force cards on mobile
    };
    handleResize(); // Initial call to set correct state on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply search filter on: note, source, category, type
  const filteredTransactions = transactions.filter((t) => {
    const search = searchTerm.toLowerCase();
    return (
      t.note?.toLowerCase().includes(search) ||
      t.source?.toLowerCase().includes(search) ||
      t.categoryId?.name?.toLowerCase().includes(search) ||
      t.type?.toLowerCase().includes(search)
    );
  });

  // Edit Handler
  const handleEdit = (transaction) => {
    const prefill = {
      ...transaction,
      date: new Date(transaction.date).toISOString().split("T")[0],
      categoryId: transaction.categoryId.id || "",
      id: transaction.id,
    };
    setEditPrefill(prefill);
    console.log(prefill)
    setEditModalOpen(true);
  };

  // Delete Handler
  const handleDelete = (transaction) => {
    setTransactionToDelete(transaction);
    setDeleteDialogOpen(true);
  };

  // Delete function
  const confirmDelete = () => {
    if (transactionToDelete) {
      deleteMutation.mutate(transactionToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setTransactionToDelete(null);
        },
      });
    }
  };

  return (
    <>
      <p className="text-center mb-2 lg:text-lg">Following are your financial entries for the given month.</p>
      <div className="space-y-4">
        {/* Header with toggles (search, view/edit) */}
        <div className="flex justify-between items-center gap-2 flex-wrap">
          {/* Left: Search bar */}
          <Input placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target. value)} className="max-w-68" />
          {/* Right: Buttons group */}
          <div className="flex gap-2">
            {/* Edit Button */}
            <Button variant="outline" onClick={() => setEditMode(!editMode)}>
              {editMode ? <SquareCheck /> : <SquarePen />}
              {editMode ? "Done" : "Edit"}
            </Button>
            {/* View Button */}
            {!isMobile && (
              <Button variant="outline" onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")}   className="flex items-center gap-2">
                {viewMode === "table" ? <LayoutGrid size={16} /> : <TableIcon size={16} />}
                {viewMode === "table" ? "Card View" : "Table View"}
              </Button>
            )}
          </div>
        </div>
        {editMode && (
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
        )}

        {/* Conditional rendering: based on screen size */}
        {isError ? (
          <p className="text-red-500">Failed to load transactions.</p>
        ) : viewMode === "table" && !isMobile ? (
          // Render DataTable (Table View)
          <DataTable columns={getColumns(editMode, handleEdit, handleDelete)} data={filteredTransactions} loading={isLoading} />
        ) : (
          // Render ViewCardList
          <ViewCardList data={filteredTransactions} editMode={editMode} loading={isLoading} 
          handleEdit={handleEdit} handleDelete={handleDelete}/>
        )}

        {/* Edit modal */}
        <TransactionModal open={editModalOpen} onClose={() => setEditModalOpen(false)}
        prefill={editPrefill}/>

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
              <Button variant="destructive" onClick={confirmDelete} disabled={deleteMutation.isLoading}>  
                {deleteMutation.isLoading ? "Deleting..." : "Delete"} 
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Transactions;
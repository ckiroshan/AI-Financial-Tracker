import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./table-columns";
import { Button } from "../ui/button";
import { LayoutGrid, SquareCheck, SquarePen, Table as TableIcon } from "lucide-react";
import ViewCardList from "./card-view-list";
import { Input } from "../ui/input";
import { useApi } from "@/api";
import TransactionModal from "./action-buttons/transaction-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";

function Transactions({ selectedMonth, refreshKey, setRefreshKey }) {
  const { getProtectedData, postProtectedData, deleteProtectedData  } = useApi(); // Custom hook: Get authenticated API access
  const [viewMode, setViewMode] = useState("table"); // Toggles data-table / card-list
  const [editMode, setEditMode] = useState(false); // Toggles edit mode
  const [isMobile, setIsMobile] = useState(false); // Toggles mobile mode
  const [searchTerm, setSearchTerm] = useState(""); // Search input state 
  const [transactions, setTransactions] = useState([]); // List of transactions
  const [loading, setLoading] = useState(true); // Manage loading state

  // Edit/Delete states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPrefill, setEditPrefill] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Fetch the data
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const month = selectedMonth.getMonth() + 1;
        const year = selectedMonth.getFullYear();
        const data = await getProtectedData(
          `transactions?month=${month}&year=${year}`
        );
        setTransactions(data);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [selectedMonth, refreshKey]); // Dependency: render when selectedMonth, refreshKey changes

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

  // Filter transactions by month/year
  const monthFiltered = selectedMonth ? transactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === selectedMonth.getMonth() &&
        d.getFullYear() === selectedMonth.getFullYear()
      );
  }) : transactions;

  // Apply search filter on: note, source, category, type
  const filteredTransactions = monthFiltered.filter((t) => {
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
  const confirmDelete = async () => {
    try {
      await deleteProtectedData(`transactions/${transactionToDelete.id}`);
      setDeleteDialogOpen(false);
      setTransactionToDelete(null);
      // Trigger refresh
      setTransactions((prev) => prev.filter(t => t.id !== transactionToDelete.id));
    } catch (err) {
      console.error("Failed to delete transaction", err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with toggles (search, view/edit) */}
      <div className="flex justify-between items-center gap-2 flex-wrap">
        {/* Left: Search bar */}
        <Input placeholder="Search transactions..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="max-w-68" />
        {/* Right: Buttons group */}
        <div className="flex gap-2">
          {/* Edit Button */}
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            {editMode ? <SquareCheck /> : <SquarePen />}
            {editMode ? "Done" : "Edit"}
          </Button>
          {/* View Button */}
          {!isMobile && (
            <Button variant="outline" onClick={() => setViewMode(viewMode === "table" ? "cards" : "table")} className="flex items-center gap-2">
              {viewMode === "table" ? <LayoutGrid size={16} /> : <TableIcon size={16} />}
              {viewMode === "table" ? "Card View" : "Table View"}
            </Button>
          )}
        </div>
      </div>

      {/* Conditional rendering: based on screen size */}
      {viewMode === "table" && !isMobile ? (
        // Render DataTable (Table View)
        <DataTable columns={getColumns(editMode, handleEdit, handleDelete)} data={filteredTransactions} loading={loading} />
      ) : (
        // Render ViewCardList
        <ViewCardList data={filteredTransactions} editMode={editMode} loading={loading} 
        handleEdit={handleEdit} handleDelete={handleDelete}/>
      )}

      {/* Edit modal */}
      <TransactionModal open={editModalOpen} onClose={() => setEditModalOpen(false)}
        onCreated={() => setRefreshKey(k => k + 1)} prefill={editPrefill}/>

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

export default Transactions;
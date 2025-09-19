import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./table-columns";
import { Button } from "../ui/button";
import { LayoutGrid, SquareCheck, SquarePen, Table as TableIcon } from "lucide-react";
import ViewCardList from "./card-view-list";
import { Input } from "../ui/input";
import { useApi } from "@/api";

function Transactions({ selectedMonth }) {
  const { getProtectedData } = useApi(); // Custom hook: Get authenticated API access
  const [viewMode, setViewMode] = useState("table"); // Toggles data-table / card-list
  const [editMode, setEditMode] = useState(false); // Toggles edit mode
  const [isMobile, setIsMobile] = useState(false); // Toggles mobile mode
  const [searchTerm, setSearchTerm] = useState(""); // Search input state 
  const [transactions, setTransactions] = useState([]); // List of transactions
  const [loading, setLoading] = useState(true); // Manage loading state

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
  }, [selectedMonth]); // Dependency: render when selectedMonth changes

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
  const monthFiltered = selectedMonth
  ? transactions.filter((t) => {
      const d = new Date(t.date);
      return (
        d.getMonth() === selectedMonth.getMonth() &&
        d.getFullYear() === selectedMonth.getFullYear()
      );
    })
  : transactions;

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
        <DataTable columns={getColumns(editMode)} data={filteredTransactions} loading={loading} />
      ) : (
        // Render ViewCardList
        <ViewCardList data={filteredTransactions} editMode={editMode} loading={loading}/>
      )}
    </div>
  );
}

export default Transactions;
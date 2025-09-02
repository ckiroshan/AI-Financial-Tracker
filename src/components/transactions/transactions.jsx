import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { getColumns } from "./table-columns";
import { Button } from "../ui/button";
import { LayoutGrid, SquareCheck, SquarePen, Table as TableIcon } from "lucide-react";
import ViewCardList from "./card-view-list";
import { Input } from "../ui/input";

function Transactions({ selectedMonth }) {
  const [viewMode, setViewMode] = useState("table"); // Toggles table / cards
  const [editMode, setEditMode] = useState(false); // Toggles edit mode
  const [isMobile, setIsMobile] = useState(false); // Toggles mobile mode
  const [searchTerm, setSearchTerm] = useState(""); // Search input state 

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Dummy data
  const [transactions] = useState([
    { type: "expense", amount: -5975, note: "Mens accessories, shirt, cufflinks", date: "2025-09-27T06:02:00.000Z", source: "COOL PLANET", categoryId: { name: "Shopping" } },
    { type: "expense", amount: -19200, note: "Weekly groceries and household items", date: "2025-09-25T14:30:00.000Z", source: "Keells Super" },
    { type: "income", amount: 125000, note: "Monthly salary credited", date: "2025-09-28T09:00:00.000Z", source: "ABC Technologies Inc.", categoryId: { name: "Salary" } },
    { type: "income", amount: 15000, note: "Freelance web development project", date: "2025-09-20T11:15:00.000Z", source: "Upwork", categoryId: { name: "Freelance" } },
    { type: "income", amount: 30000, note: "Sold old laptop", date: "2025-09-18T16:20:00.000Z", source: "Facebook Marketplace", categoryId: { name: "Other Income" } },
    { type: "expense", amount: -4500, note: "Dinner date and drinks", date: "2025-09-29T19:15:00.000Z", source: "Ministry of Crab", categoryId: { name: "Food" } },
    { type: "expense", amount: -2750, note: "Taxi rides for client meetings", date: "2025-09-30T08:40:00.000Z", source: "PickMe", categoryId: { name: "Transport" } },
    { type: "income", amount: 25000, note: "Stock market dividends", date: "2025-09-28T10:45:00.000Z", source: "Colombo SE", categoryId: { name: "Investment" } },
  ]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) setViewMode("cards"); // Force cards on mobile
    };
    handleResize();
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

  // Pagination filtered results
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMonth]);

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
            {editMode ? "Done" : "Edit Transactions"}
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

      {/* Conditional rendering */}
      {viewMode === "table" && !isMobile ? (
        <DataTable columns={getColumns(editMode)} data={paginatedData} />
      ) : (
        <ViewCardList data={paginatedData} editMode={editMode} />
      )}

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <Button variant="outline" size="sm" 
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} 
          disabled={currentPage === 1}>
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, i) => (
          <Button key={i} size="sm" 
            variant={currentPage === i + 1 ? "default" : "outline"} 
            onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </Button>
        ))}
        <Button variant="outline" size="sm" 
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} 
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Transactions;
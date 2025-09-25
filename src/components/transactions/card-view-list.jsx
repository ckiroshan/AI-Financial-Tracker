import { Banknote, SquarePen, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionModal from "./action-buttons/transaction-modal";

// Grid of transaction cards
export default function CardViewList({ data, editMode, loading, handleEdit, handleDelete }) {
  const [pageIndex, setPageIndex] = useState(0); // Track current page
  const [transactionModalOpen, setTransactionModalOpen] = useState(false); // Trigger transaction form
  
  const pageSize = 6;
  const totalPages = Math.ceil(data.length / pageSize);
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  const paginatedData = data.slice(start, end); // The subset of data to display on current page

  return (
    <>
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Loading skeletons */}
        {loading // Render a fixed number of skeletons
          ? Array.from({ length: pageSize }).map((_, i) => ( 
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 h-30 w-full my-1 md:my-0">
              <div className="flex flex-col space-y-1">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-70" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            ))
          : paginatedData.length > 0
          ? paginatedData.map((t, i) => (  // Transaction Cards: Render paginated data if available
             <div key={i} className="p-3 lg:p-4 border rounded-lg shadow-sm bg-white mb-2 md:mb-0">
               {/* Top row: transaction type badge + amount */}
               <div className="flex justify-between items-center">
                 {/* Type badge: green for income, red for expense */}
                 <span className={`text-sm font-bold text-background 
                   ${t.type === "income" 
                   ? "text-green-500" 
                   : "text-red-600"}`}>{t.type.charAt(0).toUpperCase() + t.type.slice(1).toLowerCase()}
                 </span>
                 {/* Amount: green if positive, red if negative */}
                 <span className={`font-bold 
                   ${t.type === "income" 
                   ? "text-green-600" 
                   : "text-red-600"}`}>Rs. {Math.ceil(t.amount).toLocaleString()}
                 </span>
               </div>
                {/* Mid row: Transaction note/description */}
                <p className="text-gray-700 mt-1">{t.note}</p>
                {/* Last row: date | source | category */}
                <div className="text-sm text-gray-500 mt-2">
                  {format(new Date(t.date), "yyyy-MM-dd")} | {t.source} | 
                  <span className="text-blue-400 font-bold ml-1">{t.categoryId?.name || "—"}</span>
                </div>
                {/* Action buttons: only visible in edit mode */}
                {editMode && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      className="text-background bg-yellow-400 hover:bg-yellow-500 size-8 w-16"
                      onClick={() =>
                        handleEdit({
                          ...t,
                          date: new Date(t.date).toISOString().split("T")[0],
                          categoryId: t.categoryId || "",
                          id: t.id,
                        })
                      }
                    >
                      <SquarePen  className="size-4" /> Edit
                    </Button>
                    <Button className="text-background bg-red-600 hover:bg-red-700 size-8 w-21" 
                    onClick={() => handleDelete(t)}>
                      <Trash2 className="size-4" /> Delete
                    </Button>
                  </div>
                )}
              </div>
            ))
          : ( // No Transactions Message: Display a prompt to add a transaction
            <div className="flex flex-col justify-center items-center h-60 text-center px-4 text-muted-foreground col-span-full bg-muted/50 rounded-lg">
              <div className="text-muted-foreground mb-2">
                <Banknote size={40} strokeWidth={1.5} className="text-green-600" />
              </div>
              <p className="lg:text-lg font-semibold">No transactions found</p>
              <p className="text-sm text-gray-500 mb-4">Start by adding your first one</p>
              {/* Button to open the transaction modal */}
              <Button variant="default" size="sm" onClick={() => setTransactionModalOpen(true)}>
                Add Transaction
              </Button>
            </div>
          )}
      </div>

      {/* Pagination controls: Only render if there is more than one page */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          {/* Previous page button */}
          <Button variant="outline" size="sm" onClick={() => setPageIndex((p) => Math.max(p - 1, 0))} 
          disabled={pageIndex === 0}>
            Prev
          </Button>

          {/* Page number button */}
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} size="sm" onClick={() => setPageIndex(i)} 
            variant={pageIndex === i ? "default" : "outline"} >
              {i + 1}
            </Button>
          ))}

          {/* Next page button */}
          <Button variant="outline" size="sm" disabled={pageIndex === totalPages - 1} 
          onClick={() => setPageIndex((p) => Math.min(p + 1, totalPages - 1))} >
            Next
          </Button>
        </div>
      )}
    </div>

    {/* Modals: controlled by state */}
    <TransactionModal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} />
    </>
  );
}

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Banknote } from "lucide-react";
import TransactionModal from "./action-buttons/transaction-modal";

// Component from TanStack React Table
export function DataTable({ columns, data, loading }) {
  const [sorting, setSorting] = useState([]); // Manage Sorting config
  const [pagination, setPagination] = useState({ // Manage pagination
    pageIndex: 0, // first page
    pageSize: 7, // rows per page
  });
  const [transactionModalOpen, setTransactionModalOpen] = useState(false); // Trigger transaction form

  // Initialize TanStack React Table instance
  const table = useReactTable({
    data,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), // row structure
    getSortedRowModel: getSortedRowModel(), // row sorting
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="rounded-md">
        <Table className="text-base">
          {/* Render table headers dynamically from columns */}
          <TableHeader className="bg-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-background font-semibold py-1">
                    {/* Skip placeholder headers (e.g. for grouped columns) */}
                    {header.isPlaceholder 
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* Conditional render: loading, data [or no data message] */}
            {loading ? (
              // Render a fixed number of skeletons
              Array.from({ length: 7 }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
                      <Skeleton className="h-7 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )  // Conditional render: Data - Map through the visible, paginated rows
            : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {/* Map through visible cells of current row */}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // No Data Message: Display a prompt to add a transaction
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  <div className="flex flex-col justify-center items-center h-50 text-center px-4 text-muted-foreground col-span-full">
                    <div className="text-muted-foreground mb-2">
                      <Banknote size={40} strokeWidth={1.5} className="text-green-600" />
                    </div>
                    <p className="text-lg font-semibold">No transactions found</p>
                    <p className="text-sm text-gray-500 mb-4">Start by adding your first one</p>
                    {/* Button to open the transaction modal. */}
                    <Button variant="default" size="sm" onClick={() => setTransactionModalOpen(true)}>
                      Add Transaction
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination controls: Only render if there is more than one page */}
        <div className="flex justify-center items-center gap-2 pt-4">
          {/* Previous page button */}
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} 
          disabled={!table.getCanPreviousPage()}>
            Prev
          </Button>
          
          {/* Page number button */}
          {Array.from({ length: table.getPageCount() }, (_, i) => (
            <Button key={i} size="sm" variant={
              table.getState().pagination.pageIndex === i ? "default" : "outline"} 
              onClick={() => table.setPageIndex(i)}>
              {i + 1}
            </Button>
          ))}

          {/* Next page button */}
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} 
          disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>

      {/* Modals: controlled by state */}
      <TransactionModal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} />
    </>
  );
}

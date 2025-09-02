import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Component from TanStack React Table
export function DataTable({ columns, data }) {
  // columns: Column definitions with header, cells
  // data: Array of row objects.
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), // row structure
    getSortedRowModel: getSortedRowModel(), // row sorting
  });

  return (
    <div className="rounded-md">
      <Table className="text-base">
        {/* Render table headers dynamically from columns */}
        <TableHeader className="bg-primary">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-background font-semibold py-1">
                  {/* Skip placeholder headers (e.g. for grouped columns) */}
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* Render table rows and cells */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            // If no data is available
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

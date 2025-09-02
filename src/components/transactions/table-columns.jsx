import { format } from "date-fns";
import { ArrowUpDown, SquarePen, Trash } from "lucide-react";
import { Button } from "../ui/button";

// Generates column definitions for TanStack React Table
export const getColumns = (editMode) => {
  // editMode: boolean flag to conditionally include action buttons

  const baseColumns = [
    { // Transaction Type
      accessorKey: "type",
      header: ({ column }) => (
        <Button variant="ghost" className="font-semibold text-base" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        // Badge styling based on type
        const type = row.getValue("type");
        return <span className={`px-2 py-1 rounded text-sm font-semibold ${type === "income" ? "bg-green-100 text-primary" : "bg-red-100 text-red-700"}`}>{type}</span>;
      },
    },
    { // Transaction Amount
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        return <span className={`font-medium text-lg ${amount > 0 ? "text-green-600" : "text-red-600"}`}>Rs. {amount.toLocaleString()}</span>;
      },
    },
    { // Transaction Note
      accessorKey: "note",
      header: "Note",
    },
    { // Transaction Date
      accessorKey: "date",
      header: ({ column }) => (
        <Button variant="ghost" className="font-semibold text-base" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return format(date, "yyyy-MM-dd");
      },
    },
    { // Merchant of transaction
      accessorKey: "source",
      header: "Source",
    },
    { // Category name
      accessorKey: "categoryId.name", // nested accessor
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.categoryId?.name || " ——— ";
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{category}</span>;
      },
    },
  ];

  if (editMode) {
    // Conditionally add action buttons if editMode is enabled
    baseColumns.push({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <div className="flex gap-2">
             {/* Edit button */}
            <Button variant="outline" onClick={() => alert(`Edit ${transaction.id}`)}>
              <SquarePen />
            </Button>
            {/* Delete button */}
            <Button variant="destructive" onClick={() => alert(`Delete ${transaction.id}`)}>
              <Trash />
            </Button>
          </div>
        );
      },
    });
  }

  return baseColumns;
};

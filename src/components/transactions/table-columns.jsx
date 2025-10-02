import { format } from "date-fns";
import { ArrowUpDown, SquarePen, Trash, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

// Generates column definitions for TanStack React Table
export const getColumns = (editMode, onEdit, onDelete) => {
  // editMode: boolean flag to conditionally include action column

  // Column definition: (Date, Type, Amount, Note, Source, Category)
  const baseColumns = [
    { // Transaction Date
      accessorKey: "date",
      // header component with sorting functionality
      header: ({ column }) => (
        <Button variant="ghost" className="font-semibold text-base" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      // format date cell
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));
        return format(date, "yyyy-MM-dd");
      },
    },
    { // Transaction Type (income/expense)
      accessorKey: "type",
      // header component with sorting functionality
      header: ({ column }) => (
        <Button variant="ghost" className="font-semibold text-base" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        // Badge styling based on type
        const type = row.getValue("type");
        const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        return <span className={`px-2 py-1 rounded-lg text-sm font-semibold text-background 
          ${type === "income" 
            ? "bg-green-500" 
            : "bg-red-600"
          }`}>{formattedType}</span>;
      },
    },
    { // Transaction Amount
      accessorKey: "amount",
      header: ({ column }) => (
        <Button variant="ghost" className="font-semibold text-base" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount (Rs)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      // format amount cell with currency & color
      cell: ({ row }) => {
        // text styling based on type
        const type = row.getValue("type");
        const amount = parseFloat(row.getValue("amount"));
        
        const formatted = amount.toLocaleString("en-US", { minimumFractionDigits: 2,    maximumFractionDigits: 2 });

        return (
          <span className={`text-lg text-right block w-[120px] font-semibold
            ${type === "income" 
              ? "text-green-600" 
              : "text-red-600"
            }`}>
            {formatted}
          </span>
        );
      },
    },
    { // Transaction Note
      accessorKey: "note",
      header: "Note",
    },
    { // Merchant of transaction
      accessorKey: "source",
      header: "Source",
    }, 
    { // Category name
      accessorKey: "categoryId.name", // nested accessor
      header: "Category",
      // format Category cell with category name/placeholder
      cell: ({ row }) => {
        const category = row.original.categoryId?.name || " ——— ";
        return <span className="text-blue-400 font-bold px-2 py-1 rounded-lg text-sm">{category}</span>;
      },
    },
  ];

  if (editMode) {
    // Conditionally add action buttons if editMode is enabled
    baseColumns.push({
      id: "actions",
      header: "Actions",
      // format action cell with action buttons
      cell: ({ row }) => {
        const transaction = row.original; // transaction object for actions
        return (
          <div className="flex gap-2">
             {/* Edit button */}
            <Button className="bg-yellow-400 border-1 text-background border-yellow-500 hover:bg-yellow-500 size-8 w-17" onClick={() => onEdit(transaction)} aria-label="Edit transaction">
              <SquarePen className="size-5" /> Edit
            </Button>
            {/* Delete button */}
            <Button className="text-background bg-red-600 hover:bg-red-700 border-red-500 size-8 w-22" onClick={() => onDelete(transaction)} aria-label="Delete transaction">
              <Trash2 className="size-5" /> Delete
            </Button>
          </div>
        );
      },
    });
  }

  // Returns array of column definitions
  return baseColumns;
};

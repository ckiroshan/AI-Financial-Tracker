import { SquarePen, Trash } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";

// Grid of transaction cards
export default function CardViewList({ data, editMode }) {
  // data: Array of transaction objects.
  // editMode: Boolean flag to toggle edit/delete action buttons.
  return (
    <div className="grid grid-cols-1 gap-1 md:gap-3 md:grid-cols-2 lg:grid-cols-3">
      {data.map((t, i) => (
        <div key={i} className="p-3 lg:p-4 border rounded-lg shadow-sm bg-white mb-2 md:mb-0">
          {/* Top row: transaction type badge + amount */}
          <div className="flex justify-between items-center">
            {/* Type badge: green for income, red for expense */}
            <span className={`px-2 py-1 rounded text-sm font-semibold 
              ${t.type === "income" 
              ? "bg-green-100 text-green-700" 
              : "bg-red-100 text-red-700"}`}>{t.type}</span>
            {/* Amount: green if positive, red if negative */}
            <span className={`font-bold 
              ${t.amount > 0 
              ? "text-green-600" 
              : "text-red-600"}`}>Rs. {t.amount.toLocaleString()}</span>
          </div>
          {/* Mid row: Transaction note/description */}
          <p className="text-gray-700 mt-1">{t.note}</p>
          {/* Last row: date | source | category */}
          <div className="text-xs text-gray-500 mt-2">
            {format(new Date(t.date), "yyyy-MM-dd")} | {t.source} | {t.categoryId?.name || "—"}
          </div>
          {/* Action buttons: only visible in edit mode */}
          {editMode && (
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm"><SquarePen size={16} /></Button>
              <Button variant="destructive" size="sm"><Trash size={16} /></Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

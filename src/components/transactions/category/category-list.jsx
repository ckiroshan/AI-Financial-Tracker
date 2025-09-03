import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquareCheck, SquarePen, Trash2 } from "lucide-react";

const categories = [
  { id: "68a865f639a1f1a51696e315", name: "Investment", type: "income" },
  { id: "68a865f639a1f1a51696e319", name: "Miscellaneous", type: "income" },
  { id: "68a865f639a1f1a51696e302", name: "Banking", type: "expense" },
  { id: "68a865f639a1f1a51696e305", name: "Entertainment", type: "expense" },
];

export default function CategoryList() {
  const [filter, setFilter] = useState(null); // null = show all
  const [editMode, setEditMode] = useState(false);

  const filteredCategories = filter ? categories.filter((category) => category.type === filter) : categories;

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex gap-2">
        {/* All */}
        <Button onClick={() => setFilter(null)} variant="outline" className={filter === null ? "bg-gray-200 text-gray-900" : ""}>
          All
        </Button>

        {/* Income */}
        <Button onClick={() => setFilter("income")} variant="outline" className={filter === "income" ? "bg-primary text-primary-foreground" : ""}>
          Income
        </Button>

        {/* Expense */}
        <Button onClick={() => setFilter("expense")} variant="outline" className={filter === "expense" ? "bg-red-500 text-white" : ""}>
          Expense
        </Button>

        {/* Edit toggle */}
        <Button onClick={() => setEditMode((prev) => !prev)} variant="outline" className={editMode ? "bg-gray-200 text-gray-900" : ""}>
          {editMode ? <SquareCheck /> : <SquarePen />}
          {editMode ? "Done" : "Edit Categories"}
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCategories.map((category) => (
          <div key={category.id} className="shadow-sm rounded-4xl px-4 py-3 flex flex-col justify-between">
            {/* Top row: name + type badge */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-xs md:text-sm">{category.name}</span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold 
                ${category.type === "income" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-700"}`}
              >
                {category.type}
              </span>
            </div>

            {/* Edit/Delete icons (only in edit mode) */}
            {editMode && (
              <div className="flex justify-end gap-2 mt-3">
                <button className="text-yellow-500 hover:text-yellow-700 md:size-6">
                  <SquarePen className=" size-5" />
                </button>
                <button className="text-red-500 hover:text-red-700 md:size-6">
                  <Trash2 className=" size-5" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

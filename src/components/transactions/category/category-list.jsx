import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SquareCheck, SquarePen, Trash2, ArrowDownCircle, ArrowUpCircle, Trash } from "lucide-react";

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
          {editMode ? "Done" : "Edit"}
        </Button>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
        {filteredCategories.map((category) => (
          <div key={category.id} className="shadow-sm rounded-4xl px-2 md:px-4 py-3 flex flex-col justify-between">
            {/* Top row: name + type badge */}
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm md:text-base truncate">{category.name}</span>
              {category.type === "income" ? <ArrowUpCircle className="text-green-500 size-5 md:size-6 flex-shrink-0" /> : <ArrowDownCircle className="text-red-500 size-5 md:size-6 flex-shrink-0" />}
            </div>

            {/* Edit/Delete icons (only in edit mode) */}
            {editMode && (
              <div className="flex justify-end gap-2 mt-3 mr-1 md:mr-0">
                <Button className="text-background bg-yellow-400 hover:bg-yellow-700 size-7">
                  <SquarePen className="size-5" />
                </Button>
                <Button variant="destructive" className="size-7 text-background">
                  <Trash2 className="size-5" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

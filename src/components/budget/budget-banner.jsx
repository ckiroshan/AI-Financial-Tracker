import { PlusCircle, SquarePen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useBudgetUIStore } from "@/stores/budgetUIStore";

function BudgetBanner() {
  const { setIsAddModalOpen } = useBudgetUIStore();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1">Budget list</h1>
        <Button variant="outline" className="text-base lg:text-lg hover:bg-primary hover:text-white w-40 md:w-50 lg:w-53 h-10 lg:h-13 rounded-4xl" onClick={() => setIsAddModalOpen(true)} title="Add New Budget">
          <PlusCircle className="w-5 h-5" /> Add Budget
        </Button>
      </div>
        <p className="mb-3 text-base lg:text-lg -mt-2">View all your current budgets here.</p>
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-2 md:p-3 lg:p-4 text-sm text-yellow-900  flex items-center gap-1.5 lg:text-base">
        <span>You can:</span>
        <span className="text-background bg-yellow-300 hover:bg-yellow-700 p-1 rounded-md">
          <SquarePen className="size-4" />
        </span>
        <strong>Edit</strong> or
        <span className="text-background bg-red-400 p-1 rounded-md" disabled>
          <Trash2 className="size-4" />
        </span>
        <strong>Delete</strong>
        <span>each entry as needed.</span>
      </div>
    </>
  );
}

export default BudgetBanner;

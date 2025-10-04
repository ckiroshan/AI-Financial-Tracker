import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBudgetUIStore } from "@/stores/budgetUIStore";
import { ListFilter } from "lucide-react";

const BudgetFilters = () => {
  const { filterStatus, setFilterStatus, searchQuery, setSearchQuery } = useBudgetUIStore();
  

  return (
    <div className="flex items-center justify-between gap-4 mt-5 w-full flex-wrap">
      {/* Search (left) */}
      <div className="max-w-53 md:max-w-[25rem] w-full">
        <Input placeholder="Search budgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="text-sm" />
      </div>

      {/* Actions (right) */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500 w-[8rem] md:w-[auto]">
            <ListFilter />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BudgetFilters;
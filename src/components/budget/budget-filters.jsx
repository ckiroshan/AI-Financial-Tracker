import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const BudgetFilters = ({ filterStatus, setFilterStatus, searchQuery, setSearchQuery, setIsAddModalOpen }) => {

  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex items-center justify-between gap-4 mt-5 w-full flex-wrap">
      {/* Search (left) */}
      <div className="max-w-53 md:max-w-[25rem] w-full">
        <Input placeholder="Search budgets..." value={searchQuery} onChange={handleSearchChange} className="text-sm" />
      </div>

      {/* Actions (right) */}
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={filterStatus} onValueChange={handleFilterChange}>
          <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500 w-[8rem] md:w-[auto]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="hover:bg-primary hover:text-white" onClick={() => setIsAddModalOpen(true)} title="Add Budget">
          <PlusCircle className="w-4 h-4" /> Add
        </Button>
      </div>
    </div>
  );
};

export default BudgetFilters;
"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter , Plus} from "lucide-react";
import { DateRangePicker } from "@/components/budget/date-range-picker";

const BudgetFilters = ({ 
  viewMode, 
  setViewMode, 
  filterStatus, 
  setFilterStatus, 
  searchQuery, 
  setSearchQuery,
  setIsAddModalOpen
}) => {
  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex flex-col sm:flex-row gap-4 flex-1">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4极狐 4" />
          <Input
            placeholder="Search budgets..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <Select value={filterStatus} onValueChange={handleFilterChange}>
          <SelectTrigger className="w-[180px] border-gray-200 focus:border-green-500 focus:ring-green-500">
            <Filter className="w-4 h-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all">All Budgets</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="completed">Completed Only</SelectItem>
          </SelectContent>
        </Select>

        <DateRangePicker />
      </div>

      <div className="flex gap-2">
        <Button
          variant={viewMode === "cards" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("cards")}
          className={
            viewMode === "cards"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }
        >
          Cards
        </Button>
        <Button
          variant={viewMode === "table" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("table")}
          className={
            viewMode === "table"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "border-gray-200 text-gray-700 hover:bg-gray-50"
          }
        >
          Table
        </Button>
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Budget
        </Button>
        
      </div>
    </div>
  );
};

export default BudgetFilters;
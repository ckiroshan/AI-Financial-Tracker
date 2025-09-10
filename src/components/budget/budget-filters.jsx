"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {Filter} from "lucide-react";

const BudgetFilters = ({ 
  filterStatus, 
  setFilterStatus, 
  searchQuery, 
  setSearchQuery,
}) => {
  const handleFilterChange = (value) => {
    setFilterStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
  <div className="flex flex-row gap-4 items-center mb-6 w-full">
    
    <div className="flex-1 min-w-0">
      <Input
        placeholder="Search budgets..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="border-gray-200 focus:border-green-500 focus:ring-green-500 w-full"
      />
    </div>

    
    <div className="w-[140px] sm:w-[180px] shrink-0">
      <Select value={filterStatus} onValueChange={handleFilterChange}>
        <SelectTrigger className="border-gray-200 focus:border-green-500 focus:ring-green-500 w-full">
          <Filter className="w-4 h-4 mr-2 text-gray-500" />
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          <SelectItem value="all">All Budgets</SelectItem>
          <SelectItem value="active">Active Only</SelectItem>
          <SelectItem value="completed">Completed Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);
};

export default BudgetFilters;
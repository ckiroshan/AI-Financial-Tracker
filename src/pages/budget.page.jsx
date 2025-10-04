import BudgetSummary from "@/components/budget/budget-summary";
import BudgetFilters from "@/components/budget/budget-filters";
import BudgetDisplay from "@/components/budget/budget-display";
import { MonthYearPicker } from "@/components/transactions/month-year-picker";
import { useBudgets } from "@/hooks/useBudgets";
import BudgetBanner from "@/components/budget/budget-banner";

const BudgetPage = () => {
  const { data: budgets = [], isLoading } = useBudgets();

  return (
    <div className="rounded-lg mx-4 md:mx-20 lg:mx-24 my-2 py-4 lg:px-8">
      <div className="flex justify-between items-center mb-4 lg:mb-1">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Budget Overview</h1>
        <MonthYearPicker />
      </div>
        
      {/* Summary Cards */}
      <BudgetSummary budgets={budgets} isLoading={isLoading} />

      {/* Edit Banner */}
      <BudgetBanner />
            
      {/* Filters and Search */}
      <BudgetFilters />

      {/* Budget Display */}
      <BudgetDisplay budgets={budgets} isLoading={isLoading} />
    </div>
  );
};

export default BudgetPage;


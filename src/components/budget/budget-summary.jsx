import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUIStore } from "@/stores/uiStore";
import { TrendingUp, TrendingDown, Landmark } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const BudgetSummary = ({ budgets, isLoading }) => {
  const { selectedMonth } = useUIStore();

  // Filter by selected month if set
  const monthFiltered = (budgets || []).filter((b) => {
    if (!selectedMonth) return true;
    const start = new Date(b.startDate);
    return (
      start.getFullYear() === selectedMonth.getFullYear() &&
      start.getMonth() === selectedMonth.getMonth()
    );
  });

  const activeBudgets = monthFiltered.filter((b) => b.isActive);

  // Totals based on backend fields
  const totalBudgeted = activeBudgets.reduce((sum, b) => sum + b.limitAmount, 0);
  const totalRemaining = activeBudgets.reduce((sum, b) => sum + b.remainingAmount, 0);
  const totalSpent = totalBudgeted - totalRemaining;

  const cards = [
    {
      title: "Total Budgeted",
      value: totalBudgeted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      icon: <Landmark absoluteStrokeWidth className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      bg: "bg-blue-500",
      text: "text-blue-600",
      border: "border-blue-200",
      subtitle: `Across ${activeBudgets.length} active budgets`,
    },
    {
      title: "Total Spent",
      value: totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      icon: <TrendingDown className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      bg: "bg-red-500",
      text: "text-red-600",
      border: "border-red-200",
      subtitle: `${totalBudgeted > 0 ? ((totalSpent / totalBudgeted) * 100).toFixed(1) : 0}% of total budget`,
    },
    {
      title: "Total Remaining",
      value: totalRemaining.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-white" />,
      bg: totalRemaining >= 0 ? "bg-green-500" : "bg-red-600",
      text: totalRemaining >= 0 ? "text-green-600" : "text-red-700",
      border: totalRemaining >= 0 ? "border-3 border-green-300" : "border-3 border-red-300",
      subtitle: totalRemaining >= 0 ? "Available to spend" : "You have gone over budget!",
    },
  ];

  return (
    <>
      <p className="text-base lg:text-lg text-center mb-1 lg:mb-4">Summary of your current Budget Stats (Rs)</p>
      <div className="px-0 lg:py-0 pt-3 lg:mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {cards.map((card, i) => (
            <Card key={i} className={`rounded-xl border ${card.border}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 lg:pb-2">
                <CardTitle className="text-base lg:text-xl font-normal">{card.title}</CardTitle>
                <span className={`w-8 h-8 lg:w-9 lg:h-9 ${card.bg} rounded-md flex items-center justify-center`}>{card.icon}</span>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-50" />
                  </>
                ) : (
                  <>
                    <div className={`text-lg md:text-xl lg:text-2xl font-bold ${card.text}`}>{card.value}</div>
                    <p className="text-sm text-gray-500">{card.subtitle}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default BudgetSummary;

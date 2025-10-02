import { PieChart, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUIStore } from "@/stores/uiStore";
import { useTransactionSummary } from "@/hooks/useTransactions";

// SummaryCard component for financial stats
const SummaryCard = () => {
  const { selectedMonth } = useUIStore();
  const month = selectedMonth.getMonth() + 1;
  const year = selectedMonth.getFullYear();

  const { data: summary, isLoading } = useTransactionSummary(month, year);
  const safeSummary = summary || { income: 0, expense: 0, balance: 0, balanceRate: 0 };

  // Array of objects (Cards)
  const cards = [
    {
      title: "Total Income",
      value: `Rs ${safeSummary.income.toLocaleString()}`,
      icon: <TrendingUp className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-primary",
      text: "text-primary",
      border: "border-green-200",
    },
    {
      title: "Total Expense",
      value: `Rs ${safeSummary.expense.toLocaleString()}`,
      icon: <TrendingDown className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-red-500",
      text: "text-red-500",
      border: "border-red-200",
    },
    {
      title: "Balance",
      value: `Rs ${safeSummary.balance.toLocaleString()}`,
      icon: <Wallet className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-blue-500",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    {
      title: "Savings Rate",
      value: `${safeSummary.balanceRate.toFixed(1)}%`,
      icon: <PieChart className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-purple-500",
      text: "text-purple-700",
      border: "border-purple-200",
    },
  ];

  // Array of CSS classes
  const skeletonBorders = ["border-green-200", "border-red-200", "border-blue-200", "border-purple-200"];

  return (
    <div className="px-2 md:px-0 lg:py-0 pt-3 lg:mb-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Conditional rendering: if 'loading' true */}
        {isLoading
          ? skeletonBorders.map((border, i) => (
              <Card key={i} className={`rounded-xl border ${border}`}>
                <CardContent className="py-4 lg:py-15">
                  <div className="flex items-center lg:justify-center space-x-3">
                    {/* Skeleton components for icon, text, amount */}
                    <Skeleton className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl" />
                    <div className="flex flex-col space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-28" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          // Conditional rendering: if 'loading' false
          : cards.map((card, i) => (
              <Card key={i} className={`rounded-xl border ${card.border}`}>
                <CardContent className="py-4 lg:py-15">
                  <div className="flex items-center lg:justify-center space-x-3">
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 ${card.bg} rounded-xl flex items-center justify-center`}>{card.icon}</div>
                    <div>
                      <p className="lg:text-xl md:text-lg">{card.title}</p>
                      <p className={`text-lg md:text-xl lg:text-2xl font-bold ${card.text}`}>{card.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>
    </div>
  );
};

export default SummaryCard;
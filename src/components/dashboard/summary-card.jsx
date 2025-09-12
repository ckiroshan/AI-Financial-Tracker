import { PieChart, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useApi } from "@/api";
import { Skeleton } from "@/components/ui/skeleton";

// SummaryCard component for financial stats
const SummaryCard = ({ selectedMonth }) => {
  const { getProtectedData } = useApi(); // Custom hook to handle API calls
  const [summary, setSummary] = useState({ // State to store summary data
    income: 0,
    expense: 0,
    balance: 0,
    balanceRate: 0,
  });
  const [loading, setLoading] = useState(true); // Manage loading state

  // Fetch data
  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const month = selectedMonth.getMonth() + 1;
        const year = selectedMonth.getFullYear();
        // Fetch summary data from the API endpoint
        const data = await getProtectedData(`transactions/summary?month=${month}&year=${year}`);
        setSummary(data);
      } catch (err) {
        console.error("Failed to fetch summary", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [selectedMonth]); // Only triggered whenever selectedMonth changes

  // Array of objects (Cards)
  const cards = [
    {
      title: "Total Income",
      value: `Rs ${summary.income.toLocaleString()}`,
      icon: <TrendingUp className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-primary",
      text: "text-primary",
      border: "border-green-200",
    },
    {
      title: "Total Expense",
      value: `Rs ${summary.expense.toLocaleString()}`,
      icon: <TrendingDown className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-red-500",
      text: "text-red-500",
      border: "border-red-200",
    },
    {
      title: "Balance",
      value: `Rs ${summary.balance.toLocaleString()}`,
      icon: <Wallet className="w-5 h-5 lg:w-7 lg:h-7 text-white" />,
      bg: "bg-blue-500",
      text: "text-blue-700",
      border: "border-blue-200",
    },
    {
      title: "Savings Rate",
      value: `${summary.balanceRate.toFixed(1)}%`,
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
        {loading
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
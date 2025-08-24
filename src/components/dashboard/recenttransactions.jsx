"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy data for transactions
const mockTransactions = [
  { id: 1, date: "16/08", description: "Grocery Shopping", amount: 85.5, type: "expense" },
  { id: 2, date: "16/08", description: "Salary Deposit", amount: 2500.0, type: "income" },
  { id: 3, date: "15/08", description: "Gas Station", amount: 45.2, type: "expense" },
  { id: 4, date: "15/08", description: "Coffee Shop", amount: 12.75, type: "expense" },
  { id: 5, date: "14/08", description: "Freelance Payment", amount: 350.0, type: "income" },
  { id: 6, date: "14/08", description: "Restaurant", amount: 67.3, type: "expense" },
  { id: 7, date: "13/08", description: "Online Shopping", amount: 125.99, type: "expense" },
  { id: 8, date: "13/08", description: "Utility Bill", amount: 89.45, type: "expense" },
  { id: 9, date: "12/08", description: "Investment Return", amount: 150.0, type: "income" },
  { id: 10, date: "12/08", description: "Subscription", amount: 9.99, type: "expense" },
];

// Component props
const TransactionsList = ({ selectedType }) => {
  // Filter transactions by type and get last 10
  const filteredTransactions = mockTransactions
    .filter((t) => t.type === selectedType)
    .slice(-10)
    .reverse();

  return (
    <Card className="w-full mx-auto mt-10 bg-white border border-gray-200">
      
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Last 10 {selectedType === "expense" ? "Expenses" : "Income"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filteredTransactions.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex flex-col">
              <p className="font-medium text-gray-900">{t.description}</p>
              <span className="text-xs text-gray-500">{t.date}</span>
            </div>
            <div>
              <span
                className={`font-semibold ${
                  t.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.type === "income" ? "+" : "-"}${Math.abs(t.amount).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
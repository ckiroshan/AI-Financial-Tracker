import { useApi } from "@/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { useEffect, useState } from "react";

// Shows a list of recent transactions
const TransactionsList = ({ selectedType, selectedMonth }) => {
  const { getProtectedData } = useApi(); // Custom hook to handle API calls
  const [transactions, setTransactions] = useState([]); // Store fetched transactions
  const [loading, setLoading] = useState(true); // Manage loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        // Extract month, year from Date object.
        const month = selectedMonth.getMonth() + 1;
        const year = selectedMonth.getFullYear();
        // Fetch transactions data from the API endpoint
        const data = await getProtectedData(`transactions?month=${month}&year=${year}&type=${selectedType}`);
        setTransactions(data);
        console.log(data)
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedType, selectedMonth]); // Only triggered when selectedType or selectedMonth changes
  
  const filteredTransactions = transactions.slice(-6).reverse();

  return (
    <Card className="w-full mx-auto mt-10 bg-white border border-gray-200">
      <CardHeader>
        {/* Set title based on selected type */}
        <CardTitle className="text-xl font-bold text-gray-800"> 
          Recent {selectedType === "expense" ? "Expenses" : "Income"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Conditionally render: if 'loading' true */}
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          ))
        ) : // Conditionally render: if 'loading' false & no transactions found
        filteredTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions found</p>
        ) : (
          // Conditionally render: if 'loading' false & transactions found
          filteredTransactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex flex-col">
                <p className="font-medium text-gray-900">{t.note}</p> 
                <span className="text-xs text-gray-500">{format(t.date, "dd/MM")}</span>
              </div>
              <div>
                <span className={`font-semibold 
                  ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  Rs. {t.type === "income" ? "+" : "-"}{Math.ceil(t.amount).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransactions } from "@/hooks/useTransactions";
import { useUIStore } from "@/stores/uiStore";
import { format } from "date-fns";

// Shows a list of recent transactions
const TransactionsList = ({ selectedType }) => {
  const { selectedMonth } = useUIStore();
  const month = selectedMonth.getMonth() + 1;
  const year = selectedMonth.getFullYear();
  const { data: transactions = [], isLoading } = useTransactions(month, year); // Fetch transactions with React Query
  
  const filteredTransactions = transactions.filter((t) => t.type === selectedType).slice(-6).reverse();

  return (
    <Card className="w-full mx-auto mt-10 bg-white border border-gray-200">
      <CardHeader>
        {/* Set title based on selected type */}
        <CardTitle className="text-xl font-bold text-gray-800"> 
          Recent {selectedType === "expense" ? "Expenses" : "Income"} (Rs)
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {/* Conditionally render: if 'loading' true */}
        {isLoading  ? (
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
              <div className="flex flex-col min-w-0">
                <p className="font-medium text-gray-900 max-w-[520px] md:max-w-[230px] lg:max-w-[250px]" title={t.note}>{t.note}</p> 
                <span className="text-xs text-gray-500">{format(t.date, "dd/MM")}</span>
              </div>
              <div>
                <span className={`font-semibold 
                  ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {parseFloat(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
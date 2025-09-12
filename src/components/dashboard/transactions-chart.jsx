import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useApi } from "@/api";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";

// Override default chart legend content
const BigLegendContent = (props) => (
  <ChartLegendContent
    {...props}
    className="text-xs md:text-sm lg:text-base" // overrides default size
  />
);

export function TransactionsChart({ selectedType, selectedMonth, setSelectedType }) {
  const { getProtectedData } = useApi(); // Custom hook to handle API calls
  const [chartData, setChartData] = useState([]); // Manage chart data
  const [loading, setLoading] = useState(true); // Manage loading state

  // Always keep a fixed-height chart, even with no data
  const emptyData = Array.from({ length: 0 }, (_, i) => ({
    date: `${i + 1}`,
    value: 0,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Extract month, year from Date object.
        const month = selectedMonth.getMonth() + 1;
        const year = selectedMonth.getFullYear();
        // Fetch transactions + type data from the API endpoint
        const data = await getProtectedData(`transactions/chart?month=${month}&year=${year}&type=${selectedType}`);
        setChartData(data);
        // console.log(data)
      } catch (err) {
        console.error("Error loading chart data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedType, selectedMonth]); // Only triggered when selectedType or selectedMonth changes

  // Determine which data to display
  const displayData = chartData.length > 0 ? chartData : emptyData;

  return (
    <Card className="mt-10">
      <CardContent>
        {/* Chart */}
        <ChartContainer className="h-72 w-full" config={{ value: { label: "Total Amount (Day)", color: selectedType === "expense" ? "#ef4444" : "#22c55e" } }}>
          <BarChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis dataKey="date" tickLine={true} axisLine={true} />
            <ChartTooltip content={<ChartTooltipContent formatter={(value) => `Rs. ${Math.ceil(value).toLocaleString()}`} />} />
            <Bar dataKey="value" fill={selectedType === "expense" ? "#ef4444" : "#22c55e"} radius={[6, 6, 0, 0]} />
            <ChartLegend content={<BigLegendContent />} />
          </BarChart>
        </ChartContainer>

        {/* No data message */}
        {!loading && chartData.length === 0 && <p className="text-center text-gray-500 mt-2">No data for this month</p>}

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button onClick={() => setSelectedType("expense")} variant="outline" className={`px-5 py-5 rounded-lg lg:text-base ${selectedType === "expense" ? "bg-red-500 text-white" : ""}`}>
            Expenses
          </Button>
          <Button onClick={() => setSelectedType("income")} variant="outline" className={`px-5 py-5 rounded-lg lg:text-base ${selectedType === "income" ? "bg-primary text-primary-foreground" : ""}`}>
            Income
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

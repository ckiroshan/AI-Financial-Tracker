import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useApi } from "@/api";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { useTransactionChart } from "@/hooks/useTransactions";
import { useUIStore } from "@/stores/uiStore";

// Override default chart legend content
const BigLegendContent = (props) => (
  <ChartLegendContent
    {...props}
    className="text-xs md:text-sm lg:text-base" // overrides default size
  />
);

export function TransactionsChart({ selectedType, setSelectedType }) {
  const { selectedMonth } = useUIStore();
  const month = selectedMonth.getMonth() + 1;
  const year = selectedMonth.getFullYear();

  const { data: chartData = [], isLoading } = useTransactionChart(
    month,
    year,
    selectedType
  );

  // Always keep a fixed-height chart, even with no data
  const emptyData = Array.from({ length: 0 }, (_, i) => ({
    date: `${i + 1}`,
    value: 0,
  }));

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
            <ChartTooltip content={
              <ChartTooltipContent formatter={(value) => `Rs. ${parseFloat(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} />} />
            <Bar dataKey="value" fill={selectedType === "expense" ? "#ef4444" : "#22c55e"} radius={[6, 6, 0, 0]} />
            <ChartLegend content={<BigLegendContent />} />
          </BarChart>
        </ChartContainer>

        {/* No data message */}
        {!isLoading && chartData.length === 0 && <p className="text-center text-gray-500 mt-2">No data for this month</p>}

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

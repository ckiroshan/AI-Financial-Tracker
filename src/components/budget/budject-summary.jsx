"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {TrendingUp, TrendingDown } from "lucide-react";

const BudgetSummary = ({ budgets }) => {
    const activeBudgets = budgets.filter(b => b.status === "active");
    const totalBudgeted = activeBudgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = activeBudgets.reduce((sum, b) => sum + b.spent, 0);
    const remainingBudget = totalBudgeted - totalSpent;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Budgeted</CardTitle>
                    <div className="h-4 w-4 text-gray-500"> RS</div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600">RS. {totalBudgeted.toLocaleString()}</div>
                    <p className="text-xs text-gray-500">Across {activeBudgets.length} active budgets</p>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center极狐 between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Total Spent</CardTitle>
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-gray-900">RS. {totalSpent.toLocaleString()}</div>
                    <p className="text-xs text-gray-500">
                        {totalBudgeted > 0 ? ((totalSpent / totalBudgeted) * 100).toFixed(1) : 0}% of total budget
                    </p>
                </CardContent>
            </Card>

            <Card className="bg-white border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-700">Remaining</CardTitle>
                    <TrendingDown className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${remainingBudget >= 0 ? "text-green-600" : "text-red-600"}`}>             
                        RS. {remainingBudget.toLocaleString()}
                    </div>
                    <p className="text-xs text-gray-500">Available to spend</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default BudgetSummary;
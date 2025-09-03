"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2, Calendar } from "lucide-react";

const BudgetCard = ({ budget, onDelete }) => {
  const spentPercentage = (budget.spent / budget.amount) * 100;
  const remaining = budget.amount - budget.spent;
  const isOverBudget = budget.spent > budget.amount;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg text-balance">{budget.name}</CardTitle>
            <CardDescription className="text-sm">{budget.description}</CardDescription>
          </div>
          <Badge
            variant={budget.status === "active" ? "default" : "secondary"}
            className={budget.status === "active" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {budget.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className="font-medium">
              ${budget.spent.toLocaleString()} / ${budget.amount.toLocaleString()}
            </span>
          </div>
          <Progress value={Math.min(spentPercentage, 100)} className="h-2 [&>div]:bg-green-600" />
          <div className="flex justify-between text-xs">
            <span className={`font-medium ${isOverBudget ? "text-destructive" : "text-green-600"}`}>
              {isOverBudget ? "Over budget" : "Remaining"}: ${Math.abs(remaining).toLocaleString()}
            </span>
            <span className="text-muted-foreground">{spentPercentage.toFixed(1)}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <Badge variant="outline" className="w-fit border-green-600 text-green-600">
          {budget.category}
        </Badge>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 bg-transparent border-green-600 text-green-600 hover:bg-green-50"
          >
            <Edit className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(budget.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
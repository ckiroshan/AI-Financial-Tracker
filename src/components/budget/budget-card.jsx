import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trash2, Calendar, SquarePen } from "lucide-react";

const BudgetCard = ({ budget, onEdit, onDelete }) => {
  const { id, name, limitAmount, remainingAmount, spendingPercentage, isActive, startDate, endDate, category } = budget;
  const isOverBudget = remainingAmount < 0;
  const spent = limitAmount - remainingAmount;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="font-semibold md:text-lg">{name}</CardTitle>
          </div>
          <Badge variant="default"
            className={isActive ? "bg-primary " : "bg-red-600"}>
            {isActive ? "Active" : "Budget Reached"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Spent vs Limit */}
        <div className="space-y-2 font-medium">
          <div className="flex justify-between">
            <span className="text-red-600">Spent</span>
            <span>{spent.toLocaleString()} / {limitAmount.toLocaleString()}</span>
          </div>
          <Progress value={Math.min(spendingPercentage, 100)} className="h-2 [&>div]:bg-red-600 bg-gray-200" />
          <div className="flex justify-between">
            <span className={`${isOverBudget ? "text-destructive" : "text-foreground"}`}>
              {isOverBudget ? "Over budget" : "Remaining"}: {Math.abs(remainingAmount).toLocaleString()}
            </span>
            <span className="text-muted-foreground">{(spendingPercentage * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Category */}
        <Badge variant="outline" className="w-fit px-3 bg-blue-400 text-background text-sm">
          {category?.name}
        </Badge>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button onClick={onEdit} className="text-background bg-yellow-400 hover:bg-yellow-500 size-8 w-16">
            <SquarePen className="size-4" /> Edit
          </Button>
          <Button variant="destructive" onClick={() => onDelete(budget)} className="size-8 w-23 text-background">
            <Trash2 className="size-5" /> Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCard;
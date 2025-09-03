"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2 } from "lucide-react";

export function BudgetTable({ budgets, onDelete }) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Budget Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Period</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {budgets.map((budget) => {
            const spentPercentage = (budget.spent / budget.amount) * 100;
            const remaining = budget.amount - budget.spent;
            const isOverBudget = budget.spent > budget.amount;

            return (
              <TableRow key={budget.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{budget.name}</div>
                    <div className="text-sm text-muted-foreground">{budget.description}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{budget.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">${budget.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">${budget.spent.toLocaleString()}</div>
                    <div className={`text-xs ${isOverBudget ? "text-destructive" : "text-green-600"}`}>
                      {isOverBudget ? "Over" : "Remaining"}: ${Math.abs(remaining).toLocaleString()}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Progress value={Math.min(spentPercentage, 100)} className="h-2 w-20" />
                    <div className="text-xs text-muted-foreground">{spentPercentage.toFixed(1)}%</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={budget.status === "active" ? "default" : "secondary"}>{budget.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(budget.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
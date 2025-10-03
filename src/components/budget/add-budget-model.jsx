import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Food & Dining", "Transportation", "Entertainment", "Shopping", "Home", "Health & Fitness", "Travel", "Education", "Bills & Utilities", "Other"];

export function AddBudgetModal({ isOpen, onClose, onSubmit, initialData }) {
  console.log("Modal props:", { isOpen, onClose, onSubmit, initialData });

  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    startDate: "",
    endDate: "",
  });

  // Prefill when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        amount: initialData.limitAmount || "",
        category: initialData.category?.name || "",
        startDate: initialData.startDate
          ? new Date(initialData.startDate).toISOString().split("T")[0]
          : "",
        endDate: initialData.endDate
          ? new Date(initialData.endDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      setFormData({
        name: "",
        amount: "",
        category: "",
        startDate: "",
        endDate: "",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.amount ||
      !formData.category ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return;
    }

    onSubmit({
      id: initialData?.id, // preserve id if editing
      name: formData.name,
      limitAmount: Number.parseFloat(formData.amount),
      category: { name: formData.category, type: "expense" },
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      isActive: true,
    });
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">{isEditMode ? "Edit Budget" : "Add New Budget"}</DialogTitle>
          <DialogDescription className="text-center">
            {isEditMode
              ? "Update your budget details below."
              : "Create a new budget to track your spending in a specific category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input id="name" placeholder="e.g., Monthly Groceries" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              {isEditMode ? "Save Changes" : "Create Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

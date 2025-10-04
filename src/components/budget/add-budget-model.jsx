import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories } from "@/hooks/useCategories";

export const budgetSchema = z.object({
  name: z.string(
    { required_error: "Name is required" }).min(1, "Name is required"),
  amount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }).positive("Amount must be greater than 0"),
  category: z.string({ required_error: "Category is required" }).min(1, "Category is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export function AddBudgetModal({ isOpen, onClose, initialData, onSubmit }) {
  const isEditMode = !!initialData;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categories = [], isLoading: loadingCategories } = useCategories("expense");
  const { register, handleSubmit, reset, setValue, watch, formState: { errors },
  } = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: { name: "", amount: "", category: "", startDate: "", endDate: "" },
  });
  const categoryValue = watch("category");

  // Prefill when editing
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name || "",
          amount: initialData.limitAmount || "",
          category: initialData.category?.id || "", // use id
          startDate: initialData.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
          endDate: initialData.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
        });
      } else {
        reset({ name: "", amount: "", category: "", startDate: "", endDate: "" });
      }
    } else {
      // Clear form when closing
      reset({ name: "", amount: "", category: "", startDate: "", endDate: "" });
    }
  }, [isOpen, initialData, reset]);

  const onSubmitForm = async (data) => {
    const payload = {
      id: initialData?.id,
      name: data.name,
      limitAmount: Number(data.amount),
      categoryId: data.category,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      isActive: true,
    };

    try {
      setIsSubmitting(true);
      await onSubmit(payload); 
      onClose();
    } catch (err) {
      console.error("Failed to save budget", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center">{isEditMode ? "Edit Budget" : "Add New Budget"}</DialogTitle>
          <DialogDescription className="text-center">
            {isEditMode
              ? "Update your budget details below."
              : "Create a new budget to track your spending in a specific category."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Budget Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Budget Name</Label>
            <Input id="name" placeholder="e.g., Monthly Groceries" {...register("name")} />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>
          
          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Budget Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" {...register("amount")} />
              {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryValue} onValueChange={(value) => setValue("category", value, { shouldValidate: true })} disabled={loadingCategories}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingCategories ? "Loading..." : "Select category"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-xs">{errors.category.message}</p>}
            </div>
          </div>
          
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" {...register("startDate")} />
              {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
               <Input type="date" {...register("endDate")} />
              {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              { isEditMode ? isSubmitting ? "Saving..." : "Save Changes" : isSubmitting ? "Creating..." : "Create Budget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

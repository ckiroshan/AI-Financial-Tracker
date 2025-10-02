import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTransactions, useUpdateTransaction } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";

// Zod schema
const transactionSchema = z.object({
  type: z.enum(["income", "expense"], 
        { required_error: "Type is required", invalid_type_error: "Invalid type selected" }),
  amount: z.coerce.number(
        { required_error: "Amount is required", 
          invalid_type_error: "Amount must be a number" 
        }).positive("Amount must be greater than 0"),
  note: z.string({ required_error: "Note is required"}).min(1, "Note is required"),
  date: z.string().min(1, "Date is required"),
  source: z.string().min(1, "Source is required"),
  categoryId: z.string().min(1, "Category is required"),
  receiptId: z.string().optional().nullable(),
});

// Modal to add/update a transaction
export default function TransactionModal({ open, onClose, prefill }) {
  const createMutation = useCreateTransactions();
  const updateMutation = useUpdateTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: { type: "", amount: "", note: "", date: "", source: "", category: "", receiptId: null },
  });

  // type field dynamically fetch categories
  const selectedType = watch("type");

  // fetch categories based on selected transaction type
  const { data: categories = [], isLoading: loadingCategories } = useCategories(selectedType);

  // Reset form when modal closes
  useEffect(() => {
    if (!open || !prefill) return;
    const prefillData = { ...prefill };
    // Normalize date
    if (prefillData.date) {
      prefillData.date = new Date(prefillData.date).toISOString().split("T")[0];
    }
    // Normalize categoryId safely
    if (prefillData.categoryId && typeof prefillData.categoryId === "object") {
      prefillData.categoryId = prefillData.categoryId.id || "";
    } else {
      prefillData.categoryId = prefillData.categoryId || "";
    }
    // Reset form
    reset(prefillData);
    // Once categories are loaded, explicitly set categoryId again 
    if (prefillData.categoryId && !loadingCategories) { 
      setValue("categoryId", prefillData.categoryId, { shouldValidate: true }); 
    }

  }, [open, prefill, reset, setValue, loadingCategories, categories]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true); 
      if (prefill && prefill.id) {
        // Editing existing transaction
        await updateMutation.mutateAsync({ id: prefill.id, data });
      } else {
        // Creating new transaction
        await createMutation.mutateAsync(data);
      }
      setIsSubmitting(false); 
      setTimeout(onClose(), 3000);
    } catch (err) {
      console.error("Failed to create transaction", err);
      setIsSubmitting(false); 
    }
  };

  const isLoading = createMutation.isLoading || updateMutation.isLoading || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center">
          <DialogTitle>{prefill && prefill.id ? "Update Transaction" : "Add Transaction"}</DialogTitle>
          <DialogDescription>
            {prefill && prefill.id
              ? "Modify details of this transaction."
              : "Create a transaction by filling this form."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <RadioGroup className="flex gap-4 mt-2" value={watch("type")} 
            onValueChange={(val) => setValue("type", val, { shouldValidate: true })}>
              {/* Income Button */}
              <div className="flex items-center gap-2">
                <RadioGroupItem className="data-[state=checked]:bg-green-100 data-[state=checked]:border-green-500 border-4" value="income" id="income" />
                <Label htmlFor="income" className="cursor-pointer">Income</Label>
              </div>
              {/* Expense Button */}
              <div className="flex items-center gap-2">
                <RadioGroupItem className="data-[state=checked]:bg-red-100 data-[state=checked]:border-red-500 border-4" value="expense" id="expense" />
                <Label htmlFor="expense" className="cursor-pointer">Expense</Label>
              </div>
            </RadioGroup>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <Input type="number" step="0.01" {...register("amount")} placeholder="Enter amount" />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium mb-1">Note</label>
            <Input type="text" {...register("note")} placeholder="e.g. Booked cab for client meetings.." />
            {errors.note && <p className="text-red-500 text-xs mt-1">{errors.note.message}</p>}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <Input type="date" {...register("date")} />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
          </div>

          {/* Source */}
          <div>
            <label className="block text-sm font-medium mb-1">Source</label>
            <Input type="text" {...register("source")} placeholder="e.g. Uber" />
            {errors.source && <p className="text-red-500 text-xs mt-1">{errors.source.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={watch("categoryId")} onValueChange={(value) => setValue("categoryId", value, { shouldValidate: true })} disabled={!selectedType || loadingCategories}>
              <SelectTrigger>
                <SelectValue placeholder={selectedType ? "Select category" : "Select type first"} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && <p className="text-red-500 text-xs">{errors.categoryId.message}</p>}
          </div>

          {/* Action Buttons */}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              { prefill && prefill.id
                ? isLoading ? "Updating..." : "Update"
                : isLoading ? "Saving..." : "Submit"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

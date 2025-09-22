import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/api";

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
export default function TransactionModal({ open, onClose, onCreated, prefill }) {
  const { postProtectedData, getProtectedData } = useApi();
  const [categories, setCategories] = useState([]); // manage list of categories
  const [loadingCategories, setLoadingCategories] = useState(false); // manage loading state

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
  useEffect(() => {
    if (!selectedType) return;
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const data = await getProtectedData(`categories?type=${selectedType}`);
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [selectedType]);

  // Reset form when modal closes
  useEffect(() => {
  if (open) {
    const prefillData = prefill ? { ...prefill } : {};
    if (prefillData.date) {
      // Convert ISO datetime to YYYY-MM-DD
      prefillData.date = new Date(prefillData.date).toISOString().split("T")[0];
    }
    reset(prefillData);
  }
}, [open, prefill, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const payload = { ...data, categoryId: data.category };
      await postProtectedData("transactions", data);
      if (onCreated) onCreated(); // refresh list
      onClose();
    } catch (err) {
      console.error("Failed to create transaction", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center">
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Create a transaction by submitting this form</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2 ">
                <input type="radio" value="income" {...register("type")} className="accent-green-500" />
                Income
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="expense" {...register("type")} className="accent-red-500" />
                Expense
              </label>
            </div>
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
            <Select value={watch("categoryId")} onValueChange={(value) => setValue("categoryId", value, { shouldValidate: true })} disabled={!selectedType}>
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
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

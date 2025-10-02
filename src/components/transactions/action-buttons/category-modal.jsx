import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCategories, useCreateCategory, useUpdateCategory } from "@/hooks/useCategories";
import { Loader2 } from "lucide-react";

// Zod schema for form validation
const categorySchema = z.object({
  type: z.enum(["income", "expense"], 
    { required_error: "Type is required", invalid_type_error: "Invalid type selected" }),
  name: z.string().min(1, "Name is required"),
});

// Modal for creating/editing a new category or existing one
export default function CategoryModal({ open, onClose, prefill }) {
  const { data: categories = [] } = useCategories(prefill?.type || "income"); // Fetch categories for duplicate check
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null); // Store submission errors

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(categorySchema), 
    defaultValues: { type: "", name: "" },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) return;
    const prefillData = prefill ? { ...prefill } : {};
    reset(prefillData); // Reset the form
    setSubmitError(null); // Clear any submission errors
  }, [open, reset, prefill]);

  // Handle form submission
  const onSubmit = async (data) => {
    // Client-side check for duplicate category name/type
    const isDuplicate = categories.some(
      (category) => 
        category.name.toLowerCase() === data.name.toLowerCase() && 
        category.type === data.type && 
        (!prefill || prefill.id !== category.id) // allow editing same record
    );

    if (isDuplicate) {
      setSubmitError("A category with this name and type already exists.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Determine if update or create request
      if (prefill?.id) {
        await updateCategory.mutateAsync({ id: prefill.id, ...data });
      } else {
        await createCategory.mutateAsync(data);
      }
      setTimeout(onClose(), 3000);
    } catch (err) {
      console.error("Failed to save category", err);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = createCategory.isLoading || updateCategory.isLoading || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center">
          {/* Dynamically change title based on `prefill` prop */}
          <DialogTitle>{prefill ? "Edit Category" : "New Category"}</DialogTitle>
          <DialogDescription>{prefill ? "Update this category." : "Create a new category."}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type - Radio Buttons */}
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
              <div className="flex items-center space-x-2">
                <RadioGroupItem className="data-[state=checked]:bg-red-100 data-[state=checked]:border-red-500 border-4" value="expense" id="expense" />
                <Label htmlFor="expense" className="cursor-pointer">Expense</Label>
              </div>
            </RadioGroup>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input type="text" placeholder="e.g. Food, Rent" {...register("name")} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          {/* Duplicate error */}
          {submitError && <p className="text-red-500 text-sm">{submitError}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className={isLoading ? "opacity-50 cursor-not-allowed" : ""}>
              {isLoading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
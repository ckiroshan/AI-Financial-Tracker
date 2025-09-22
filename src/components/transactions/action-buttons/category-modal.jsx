import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/api";

// Zod schema
const categorySchema = z.object({
  type: z.enum(["income", "expense"], { required_error: "Type is required", invalid_type_error: "Invalid type selected" }),
  name: z.string().min(1, "Name is required"),
});

// Modal for creating a new category
export default function CategoryModal({ open, onClose, onCreated }) {
  const { postProtectedData, getProtectedData } = useApi();

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ 
    resolver: zodResolver(categorySchema), 
    defaultValues: { type: "", name: "" } });
  
  // Reset form when modal closes
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const payload = { ...data };
      await postProtectedData("categories", data);
      // console.log(await getProtectedData("categories"));
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
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Create a category by submitting this form</DialogDescription>
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

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input type="text" placeholder="e.g. Food, Rent" {...register("name")} />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
          </div>

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
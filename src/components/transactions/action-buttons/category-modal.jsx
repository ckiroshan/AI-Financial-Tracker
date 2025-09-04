import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const categorySchema = z.object({
  type: z.enum(["income", "expense"], { required_error: "Type is required" }),
  name: z.string().min(1, "Name is required"),
});

export default function CategoryModal({ open, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: zodResolver(categorySchema), defaultValues: { type: "", name: "" } });

  // Reset form when modal closes
  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Category submitted:", data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex items-center">
          <DialogTitle>New Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select value={watch("type")} onValueChange={(val) => setValue("type", val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <p className="text-red-500 text-xs">{errors.type.message}</p>}
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

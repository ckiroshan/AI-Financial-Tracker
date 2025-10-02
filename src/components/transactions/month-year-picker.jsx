import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";

// Date Component for selecting a month and year
export function MonthYearPicker() {
  const { selectedMonth, setSelectedMonth } = useUIStore();
  const [open, setOpen] = useState(false); // Controls popover visibility

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger button with selected month */}
      <PopoverTrigger asChild>
        <Button className="flex items-center font-bold shadow-md">
          <CalendarIcon size={16} />
          { selectedMonth 
            ? format(selectedMonth, "MMMM yyyy") // Format selected date
            : "Select month" // Fallback label
          } 
        </Button>
      </PopoverTrigger>
      {/* Calendar component */}
      <PopoverContent>
        <Calendar
          mode="single"
          selected={selectedMonth}
          className="w-auto p-0"
          onSelect={(date) => {
            if (date) {
              // Normalize to first day of month
              const normalized = new Date(date.getFullYear(), date.getMonth(), 1);
              setSelectedMonth(normalized); // Update parent state
              setOpen(false);
            }
          }}
          // Optional: start on month view
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

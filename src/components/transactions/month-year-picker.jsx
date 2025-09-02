import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// Date Component for selecting a month and year
export function MonthYearPicker({ selectedMonth, onChange }) {
  // selectedMonth: currently selected Date object (normalized to first of month)
  // onChange: callback to update parent state with selected month

  // Controls popover visibility
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger button with selected month */}
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center">
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
              onChange(normalized); // Update parent state
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

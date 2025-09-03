"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"

export function DateRangePicker() {
  const [selectedRange, setSelectedRange] = useState("this-month")
  const [customDate, setCustomDate] = useState()
  const [isOpen, setIsOpen] = useState(false)

  const getRangeLabel = () => {
    switch (selectedRange) {
      case "this-month":
        return "This Month"
      case "last-month":
        return "Last Month"
      case "this-quarter":
        return "This Quarter"
      case "this-year":
        return "This Year"
      case "custom":
        return customDate ? format(customDate, "MMM dd, yyyy") : "Custom Date"
      default:
        return "This Month"
    }
  }

  return (
    <div className="flex gap-2">
      <Select value={selectedRange} onValueChange={setSelectedRange}>
        <SelectTrigger className="w-[160px]">
          <CalendarDays className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="this-month">This Month</SelectItem>
          <SelectItem value= "last-month">Last Month</SelectItem>
          <SelectItem value="this-quarter">This Quarter</SelectItem>
          <SelectItem value="this-year">This Year</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>

      {selectedRange === "custom" && (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[140px] justify-start bg-transparent">
              {customDate ? format(customDate, "MMM dd, yyyy") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={customDate}
              onSelect={(date) => {
                setCustomDate(date)
                setIsOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
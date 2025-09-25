import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ReceiptCardSkeleton() {
  return (
    <Card className="overflow-hidden pt-0 h-full flex flex-col">
      {/* Image skeleton */}
      <Skeleton className="w-full h-60" />
      <CardContent className="px-4 space-y-2">
        {/* Merchant name */}
        <Skeleton className="h-5 w-1/2" />
        {/* Context */}
        <Skeleton className="h-4 w-3/4" />
        {/* Date + Amount */}
        <div className="flex items-center justify-between mt-1">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        {/* Buttons */}
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

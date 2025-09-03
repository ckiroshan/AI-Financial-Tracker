import { Card, CardContent } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle } from "lucide-react";

export default function ReceiptCard({ receipt, onDelete, onProcess }) {
  return (
    <Card className="overflow-hidden pt-0 h-full flex flex-col">
      {/* Image */}
      <img src={receipt.fileUrl} alt={receipt.merchantName} className="w-full h-60 object-cover" />

      {/* Content */}
      <CardContent className="flex flex-col flex-1 justify-between px-4">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-lg">{receipt.merchantName}</h3>
            {/* Process / Check */}
            {receipt.isProcessed ? (
              <CheckCircle className="text-green-600" size={20} />
            ) : (
              <Button variant="default" size="sm" onClick={() => onProcess?.(receipt.id)}>
                Process
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-500">{receipt.context}</p>
          <div className="flex items-center justify-between">
            <p className="mt-2 font-bold text-primary">Rs. {receipt.amountDetected.toLocaleString()}</p>
            {/* Delete button */}
            <Button variant="ghost" size="5" onClick={() => onDelete?.(receipt.id)} className="text-red-500 hover:text-red-600">
              <Trash2 className="size-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

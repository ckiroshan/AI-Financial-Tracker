import { Card, CardContent } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, Loader, Eye } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { format } from "date-fns";

export default function ReceiptCard({ receipt, onDelete, onProcess }) {
  const [previewOpen, setPreviewOpen] = useState(false); // Manage image modal

  return (
    <>
      <Card className="overflow-hidden pt-0 h-full flex flex-col">
        {/* Image with preview button */}
        <div className="relative group w-full h-60">
          <img src={receipt.fileUrl} alt={receipt.merchantName} className="w-full h-60 object-cover" />
          <button onClick={() => setPreviewOpen(true)} className="absolute inset-0 flex items-center justify-center bg-black/10 text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="flex items-center bg-white/80 px-3 py-1 rounded shadow-md text-sm font-medium">
              <Eye className="size-5 mr-1" />
              View
            </span>
          </button>
        </div>

        {/* Content */}
        <CardContent className="px-4">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium md:text-lg">{receipt.merchantName}</h3>
            </div>
            <p className="text-sm text-gray-500">{receipt.context}</p>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-slate-700">{format(receipt.transactionDate, "dd/MM/yyyy")}</p>
              <p
                className={`font-bold 
                ${receipt.draftTransaction.type === "income" ? "text-green-600" : "text-red-600"}`}
              >
                Rs. {Math.ceil(receipt.amountDetected).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              {/* Process / Check */}
              {receipt.isProcessed ? (
                <span className="flex text-green-600 font-medium">
                  <CheckCircle className="size-6 mr-1" /> Verified
                </span>
              ) : (
                <Button variant="default" className="size-8 w-25" onClick={onProcess}>
                  <Loader className="size-5" /> Process
                </Button>
              )}
              {/* Delete button */}
              <Button variant="destructive" onClick={onDelete} className="size-8 w-23 text-background">
                <Trash2 className="size-5" /> Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Modal Preview */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto p-0">
          <img src={receipt.fileUrl} alt="Preview" className="w-full h-auto" />
          <DialogTitle className="sr-only">{receipt.merchantName}</DialogTitle>
          <DialogDescription className="sr-only">{receipt.context}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

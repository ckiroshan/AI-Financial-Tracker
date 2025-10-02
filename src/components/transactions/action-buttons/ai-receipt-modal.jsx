import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TransactionModal from "./transaction-modal";
import { useParseReceipt } from "@/hooks/useReceipts";
import { Loader2 } from "lucide-react";

// Modal for uploading receipt image for AI parsing
export default function AIReceiptModal({ open, onClose }) {
  const [file, setFile] = useState(null); // hold image file
  const [isMobile, setIsMobile] = useState(false); // if user is on mobile device
  const [transactionPrefill, setTransactionPrefill] = useState(null); // store draft transaction from receipt
  const [transactionModalOpen, setTransactionModalOpen] = useState(false); // control modal visibility
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parseReceiptMutation = useParseReceipt(); // React Query mutation for parsing receipt

  useEffect(() => {
    // Mobile detection
    const mobileCheck = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  // Reset file whenever modal closes
  useEffect(() => {
    if (!open) setFile(null);
  }, [open]);

  const handleSubmit = async () => {
    if (!file) return; // Prevent no file submission
    setIsSubmitting(true); 
    const formData = new FormData(); // FormData object
    formData.append("receipt", file);
    parseReceiptMutation.mutate(formData, {
      onSuccess: (data) => {
        setTransactionPrefill(data.receipt.draftTransaction);
        setTransactionModalOpen(true);
        setIsSubmitting(false); 
        onClose();
      },
      onError: (error) => {
        console.error("Receipt parsing failed:", error);
        setIsSubmitting(false); 
      },
    });
  };

  const handleCancel = () => {
    setFile(null); // Explicit reset on cancel
    onClose();
  };

  const isLoading = parseReceiptMutation.isLoading || isSubmitting;

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex items-center">
            <DialogTitle>Upload Receipt</DialogTitle>
            <DialogDescription>Upload image of a bill to create a transaction using A.I</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* In Mobile */}
            {isMobile ? (
              <>
                {/* Camera option */}
                <div>
                  <label className="block text-sm font-medium mb-1">Take a photo</label>
                  <Input type="file" accept="image/*" capture="environment" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                {/* File upload option */}
                <div>
                  <label className="block text-sm font-medium mb-1">Upload from device</label>
                  <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                </div>
              </>
            ) : (
              <>
                {/* In Desktop - File upload option */}
                <div>
                  <label className="block text-sm font-medium mb-1">Upload from device</label>
                  <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-gray-500" />
                </div>
              </>
            )}

            {/* Shows selected file */}
            {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!file || isLoading}  
            className={isLoading ? "opacity-50 cursor-not-allowed" : ""}>
              {isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction modal opens with prefilled OCR data */}
      <TransactionModal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} 
      prefill={transactionPrefill} />
    </>
  );
}

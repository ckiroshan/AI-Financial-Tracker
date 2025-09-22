import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApi } from "@/api";
import TransactionModal from "./transaction-modal";

// Modal for uploading receipt image for AI parsing
export default function AIReceiptModal({ open, onClose, onCreated }) {
  const [file, setFile] = useState(null); // hold image file
  const [isMobile, setIsMobile] = useState(false); // if user is on mobile device
  const [transactionPrefill, setTransactionPrefill] = useState(null); // store draft transaction from receipt
  const [transactionModalOpen, setTransactionModalOpen] = useState(false); // control modal visibility
  const { postProtectedFile } = useApi(); // Custom hook to handle file uploads

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
    try {
      const formData = new FormData(); // FormData object
      formData.append("receipt", file);
      // Post file for AI parsing
      const { receipt } = await postProtectedFile("receipts/parse", formData);
      // Pass draftTransaction to TransactionModal
      setTransactionPrefill(receipt.draftTransaction);
      setTransactionModalOpen(true);
      onClose(); // close AI modal
    } catch (err) {
      console.error("Failed to parse receipt", err);
    }
  };

  const handleCancel = () => {
    setFile(null); // Explicit reset on cancel
    onClose();
  };

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
                <div>
                  {/* Camera option */}
                  <label className="block text-sm font-medium mb-1">Take a photo</label>
                  <Input type="file" accept="image/*" capture="environment" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <div>
                  {/* File upload option */}
                  <label className="block text-sm font-medium mb-1">Upload from device</label>
                  <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
                </div>
              </>
            ) : (
              <>
                {/* In Desktop */}
                <div>
                  {/* File upload option */}
                  <label className="block text-sm font-medium mb-1">Upload from device</label>
                  <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="text-gray-500" />
                </div>
              </>
            )}

            {/* Shows selected file */}
            {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={!file}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transaction modal opens with prefilled OCR data */}
      <TransactionModal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} 
      onCreated={onCreated} prefill={transactionPrefill} />
    </>
  );
}

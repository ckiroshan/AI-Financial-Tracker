import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AIReceiptModal({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Mobile detection
    const mobileCheck = /Mobi|Android/i.test(navigator.userAgent);
    setIsMobile(mobileCheck);
  }, []);

  // Reset file whenever modal closes
  useEffect(() => {
    if (!open) setFile(null);
  }, [open]);

  const handleSubmit = () => {
    if (!file) return;
    console.log("Submitting file:", file);
    onClose();
  };

  const handleCancel = () => {
    setFile(null); // Explicit reset on cancel
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Receipt</DialogTitle>
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
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { useEffect, useRef, useState } from "react";
import ReceiptCard from "./receipt-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, FolderOpen, Inbox } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import TransactionModal from "../action-buttons/transaction-modal";
import AIReceiptModal from "../action-buttons/ai-receipt-modal";
import { ReceiptCardSkeleton } from "./receipt-card-skeleton";
import { useReceipts } from "@/hooks/useReceipts";

// Displays a carousel of receipts
export default function ReceiptsCarousel() {
  const { data: receipts = [], isLoading, deleteReceipt } = useReceipts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Local UI state
  const [filter, setFilter] = useState("all"); // Filter receipts
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel: current index
  const [itemsPerView, setItemsPerView] = useState(1); // Carousel: items count
  const containerRef = useRef(null); // Carousel: container for dynamic sizing

  // Modal & delete confirmation state
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [aiReceiptModalOpen, setAiReceiptModalOpen] = useState(false);
  const [prefillFromReceipt, setPrefillFromReceipt] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [receiptToDelete, setReceiptToDelete] = useState(null);

  // State: check if there are no receipts
  const hasNoReceipts = receipts.length === 0;

  // Filter receipts
  const filteredReceipts = receipts.filter((receipt) => {
    if (filter === "processed") return receipt.isProcessed;
    if (filter === "unprocessed") return !receipt.isProcessed;
    return true;
  });

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filter, itemsPerView]);

  // Dynamically calculate items per view (Carousel sizing)
  useEffect(() => {
    if (!containerRef.current) return;
    // ResizeObserver: Detect changes in container's dimensions
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width >= 1024) setItemsPerView(3);      // Large screens: 3 items
        else if (width >= 768) setItemsPerView(2); // Medium screens: 2 items
        else setItemsPerView(1);                  // Small screens: 1 item
      }
    });

    observer.observe(containerRef.current);
    // Disconnect observer when component unmounts
    return () => observer.disconnect();
  }, []);
  
  // Delete Receipt Handler
  const handleDelete = (receipt) => {
    setReceiptToDelete(receipt);
    setDeleteDialogOpen(true);
  };

  // Confirm deletion handler
  const confirmDelete = async () => {
    if (!receiptToDelete) return;
    try {
      setIsSubmitting(true);
      await deleteReceipt.mutateAsync(receiptToDelete.id);
      setDeleteDialogOpen(false);
      setReceiptToDelete(null);
    } catch (err) {
      console.error("Failed to delete receipt", err);
    } finally {
      setIsSubmitting(false); // stop local loading
    }
  };

  // Process receipt → open transaction modal
  const handleProcess = (receipt) => {
    if (!receipt.draftTransaction) return;
    // Set state with pre-filled transaction data from receipt
    setPrefillFromReceipt({
      type: receipt.draftTransaction.type,
      amount: receipt.amountDetected || "",
      note: receipt.context || "",
      date: new Date().toISOString().split("T")[0],
      source: receipt.merchantName || "",
      categoryId: "",
      receiptId: receipt.id
    });
    setTransactionModalOpen(true);
  };

  const maxIndex = Math.max(0, filteredReceipts.length - itemsPerView); // Maximum scroll index
  // Carousel navigation functions
  const next = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="space-y-4">
      {/* Filter buttons */}
      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          All
        </Button>
        <Button variant={filter === "processed" ? "default" : "outline"} onClick={() => setFilter("processed")}>
          Processed
        </Button>
        <Button variant={filter === "unprocessed" ? "default" : "outline"} onClick={() => setFilter("unprocessed")}>
          Unprocessed
        </Button>
      </div>

      {/* Carousel */}
      <div className="relative flex items-center" ref={containerRef}>
        {/* Left arrow */}
        <Button variant="outline" size="icon" className="z-10 mr-1 md:mr-2" onClick={prev} disabled={currentIndex === 0} aria-label="Previous receipts">
          <ChevronLeft strokeWidth={1.8} className="text-green-600 size-5 md:size-7" />
        </Button>

        {/* Cards or Empty Message */}
        <div className="overflow-hidden flex-1">
          {isLoading ? (
            // Show skeletons while fetching
            <div className="flex -mx-2">
              {Array.from({ length: itemsPerView }).map((_, i) => (
                <div key={i} className="flex-shrink-0 px-2" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
                  <ReceiptCardSkeleton />
                </div>
              ))}
            </div>
          ) : filteredReceipts.length > 0 ? (
            // Show carousel once loaded
            <div className="flex transition-transform duration-300 -mx-2"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}>
              {filteredReceipts.map((receipt) => (
                <div key={receipt.id} className="flex-shrink-0 px-2" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
                  <ReceiptCard receipt={receipt} onDelete={() => handleDelete(receipt)} onProcess={() => handleProcess(receipt)} />
                </div>
              ))}
            </div>
          ) : (
            // Empty states
            <>
              {filter === "unprocessed" ? (
                // Unprocessed empty state
                <div className="flex flex-col justify-center items-center h-60 text-center px-4 text-muted-foreground">
                  <div className="text-muted-foreground mb-2">
                    <CheckCircle size={48} strokeWidth={1.5} className="text-green-600" />
                  </div>
                  <p className="text-lg font-semibold">You have no unprocessed receipts at the moment</p>
                  <p className="text-sm text-gray-500">You're good to go!</p>
                </div>
              ) : hasNoReceipts ? (
                // No receipts created
                <div className="flex flex-col justify-center items-center h-60 text-center px-4 text-muted-foreground">
                  <div className="text-muted-foreground mb-2">
                    <FolderOpen size={48} strokeWidth={1.5} className="text-green-600" />
                  </div>
                  <p className="text-lg font-semibold">No receipts yet</p>
                  <p className="text-sm text-gray-500 mb-4">Start by uploading your first one</p>
                  <Button variant="default" size="sm" onClick={() => setAiReceiptModalOpen(true)}>
                    Upload Receipt
                  </Button>
                </div>
              ) : (
                // Created but Unprocessed receipts
                <div className="flex flex-col justify-center items-center h-60 text-center px-4 text-muted-foreground">
                  <div className="text-muted-foreground mb-2">
                    <Inbox size={48} strokeWidth={1.5} className="text-green-600" />
                  </div>
                  <p className="text-lg font-semibold">No processed receipts yet</p>
                  <p className="text-sm text-gray-500">Process some receipts to see them here</p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right arrow */}
        <Button variant="outline" size="icon" className="z-10 ml-1 md:ml-2" onClick={next} disabled={currentIndex === maxIndex} aria-label="Next receipts">
          <ChevronRight strokeWidth={1.8} className="text-green-600 size-5 md:size-7" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription className="text-base text-foreground">
              Are you sure you want to delete this receipt?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AI Receipt modal */}
      <AIReceiptModal open={aiReceiptModalOpen} onClose={() => setAiReceiptModalOpen(false)} />
      {/* Transaction modal */}
      <TransactionModal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} 
      prefill={prefillFromReceipt} />
    </div>
  );
}

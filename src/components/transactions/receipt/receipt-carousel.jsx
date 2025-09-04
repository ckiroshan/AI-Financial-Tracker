import { useEffect, useRef, useState } from "react";
import ReceiptCard from "./receipt-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, FolderOpen, Inbox } from "lucide-react";

export default function ReceiptsCarousel({ receipts }) {
  const [filter, setFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const containerRef = useRef(null);
  const hasNoReceipts = receipts.length === 0;

  // Filter receipts
  const filteredReceipts = receipts.filter((receipt) => {
    if (filter === "processed") return receipt.isProcessed;
    if (filter === "unprocessed") return !receipt.isProcessed;
    return true;
  });

  const maxIndex = Math.max(0, filteredReceipts.length - itemsPerView);

  const next = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  // Dynamically calculate items per view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        if (width >= 1024) setItemsPerView(3);
        else if (width >= 768) setItemsPerView(2);
        else setItemsPerView(1);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
        <Button variant="outline" size="icon" className="z-10 mr-1 md:mr-2" onClick={prev} disabled={currentIndex === 0}>
          <ChevronLeft strokeWidth={2.6} className="text-green-600 size-5 md:size-7" />
        </Button>

        {/* Cards or Empty Message */}
        <div className="overflow-hidden flex-1">
          {filteredReceipts.length > 0 ? (
            // ✅ Show carousel
            <div
              className="flex transition-transform duration-300 -mx-2"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {filteredReceipts.map((receipt) => (
                <div key={receipt.id} className="flex-shrink-0 px-2" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>
                  <ReceiptCard receipt={receipt} onDelete={(id) => console.log("Delete receipt", id)} onProcess={(id) => console.log("Process receipt", id)} />
                </div>
              ))}
            </div>
          ) : (
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
                  <Button variant="default" size="sm" onClick={() => router.push("/upload")}>
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
        <Button variant="outline" size="icon" className="z-10 ml-1 md:ml-2" onClick={next} disabled={currentIndex === maxIndex}>
          <ChevronRight strokeWidth={2.6} className="text-green-600 size-5 md:size-7" />
        </Button>
      </div>
    </div>
  );
}

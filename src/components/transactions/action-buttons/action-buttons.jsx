import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PlusCircle, Camera, Box } from "lucide-react";
import AIReceiptModal from "./ai-receipt-modal";
import TransactionModal from "./transaction-modal";
import CategoryModal from "./category-modal";
import { useState } from "react";

export default function ActionButtons() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [transactionModalOpen, setTransactionModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const actions = [
    {
      label: "A.I Receipt",
      icon: <Camera className="size-6" />,
      tooltip: "Upload an image of receipt to auto-generate a transaction",
      onClick: () => setAiModalOpen(true),
    },
    {
      label: "Transaction",
      icon: <PlusCircle className="size-6" />,
      tooltip: "Manually add a new income or expense transaction",
      onClick: () => setTransactionModalOpen(true),
    },
    {
      label: "Category",
      icon: <Box className="size-6" />,
      tooltip: "Create a new category to organize your transactions",
      onClick: () => setCategoryModalOpen(true),
    },
  ];

  return (
    <>
      <TooltipProvider>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-9 mt-6">
          {actions.map((action, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <Button onClick={action.onClick} className="text-md lg:text-lg text-foreground bg-background border-2 hover:text-background rounded-4xl h-22 lg:mx-4 flex flex-col">
                  {action.icon}
                  {action.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

      {/* Modals */}
      <AIReceiptModal open={aiModalOpen} onClose={() => setAiModalOpen(false)} />
      <TransactionModal open={transactionModalOpen} onClose={() => setTransactionModalOpen(false)} />
      <CategoryModal open={categoryModalOpen} onClose={() => setCategoryModalOpen(false)} />
    </>
  );
}

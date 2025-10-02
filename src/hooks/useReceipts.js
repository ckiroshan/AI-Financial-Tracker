import { useApi } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useReceipts = () => {
  const { getProtectedData, deleteProtectedData } = useApi();
  const queryClient = useQueryClient();

  // Get all receipts
  const receiptsQuery = useQuery({
    queryKey: ["receipts"],
    queryFn: () => getProtectedData("receipts"),
  });

  // Delete receipt by ID
  const deleteReceipt = useMutation({
    mutationFn: (id) => deleteProtectedData(`receipts/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["receipts"]),
  });

  return { ...receiptsQuery, deleteReceipt };
};

// Parse receipt from file (image)
export const useParseReceipt = () => {
  const { postProtectedFile } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => postProtectedFile("receipts/parse", formData),
    onSuccess: () => queryClient.invalidateQueries(["receipts"]),
  });
};
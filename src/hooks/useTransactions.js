import { useApi } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch Transactions
export const useTransactions = (month, year) => {
  const { getProtectedData } = useApi();
  return useQuery({
    queryKey: ["transactions", month, year],
    queryFn: () => getProtectedData(`transactions?month=${month}&year=${year}`),
  });
};

// Create Transactions
export const useCreateTransactions = () => {
  const { postProtectedData } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postProtectedData("transactions", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["summary"]);
    },
  });
};

// Update Transaction
export const useUpdateTransaction = () => {
  const { putProtectedData } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => putProtectedData(`transactions/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["summary"]);
    },
  });
};

// Delete Transaction
export const useDeleteTransactions = () => {
  const { deleteProtectedData } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProtectedData(`transactions/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
      queryClient.invalidateQueries(["summary"]);
    },
  });
};

// Fetch Transactions Summary data
export const useTransactionSummary = (month, year) => {
  const { getProtectedData } = useApi();
  return useQuery({
    queryKey: ["summary", month, year],
    queryFn: () => getProtectedData(`transactions/summary?month=${month}&year=${year}`),
  });
};

// Fetch Transactions Chart data
export const useTransactionChart = (month, year, type) => {
  const { getProtectedData } = useApi();
  return useQuery({
    queryKey: ["transactionsChart", month, year, type],
    queryFn: () => getProtectedData(`transactions/chart?month=${month}&year=${year}&type=${type}`),
    keepPreviousData: true,
  });
};

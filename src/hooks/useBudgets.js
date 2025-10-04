import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/api";

// Fetch all budgets
export const useBudgets = () => {
  const { getProtectedData } = useApi();
  return useQuery({
    queryKey: ["budgets"],
    queryFn: () => getProtectedData("budgets"),
  });
};

// Create budget
export const useCreateBudget = () => {
  const { postProtectedData } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postProtectedData("budgets", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

// Update budget
export const useUpdateBudget = () => {
  const { putProtectedData } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => putProtectedData(`budgets/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};

// Delete budget
export const useDeleteBudget = () => {
  const { deleteProtectedData } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteProtectedData(`budgets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
  });
};
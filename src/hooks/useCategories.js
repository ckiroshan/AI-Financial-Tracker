import { useApi } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Fetch all categories
export const useAllCategories = () => {
  const { getProtectedData } = useApi();
  
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getProtectedData("categories"),
  });
};

// Fetch all categories by type
export const useCategories = (type) => {
  const { getProtectedData } = useApi();

  return useQuery({
    queryKey: ["categories", type],
    queryFn: () => getProtectedData(`categories?type=${type}`),
    enabled: !!type, // only run when type is selected
  });
};

// Create category
export const useCreateCategory = () => {
  const { postProtectedData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postProtectedData("categories", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Update category
export const useUpdateCategory = () => {
  const { putProtectedData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }) => putProtectedData(`categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

// Delete category
export const useDeleteCategory = () => {
  const { deleteProtectedData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProtectedData(`categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
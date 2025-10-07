
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/api";

// Fetch notifications (calls /reminders backend)
export const useNotifications = (upcoming = false) => {
  const { getProtectedData } = useApi();
  return useQuery({
    queryKey: ["notifications", { upcoming }],
    queryFn: () => getProtectedData(`reminders?upcoming=${upcoming}`),
  });
};

// Delete notification (calls /reminders/:id backend)
export const useDeleteNotification = () => {
  const { deleteProtectedData } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProtectedData(`reminders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });
};
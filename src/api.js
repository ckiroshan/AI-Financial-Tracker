import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const useApi = () => {
  const { getToken } = useAuth();

  // Fetches data from protected endpoint
  const getProtectedData = async (endpoint) => {
    try {
      // Retrieve auth token
      const token = await getToken();
      // Initiate fetch request to specified endpoint
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      // Parse & return JSON response
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  };

  return { getProtectedData };
};

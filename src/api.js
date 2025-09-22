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

  // Post data to protected endpoint
  const postProtectedData = async (endpoint, body) => {
    // Retrieve auth token
    const token = await getToken();
    // Initiate Post request to specified endpoint
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Failed to post to ${endpoint}`);
    // Parse & return JSON response
    return await response.json();
  };

  // Post file/image to protected endpoint
  const postProtectedFile = async (endpoint, formData) => {
    // Retrieve auth token
    const token = await getToken();
    // Initiate Post request to specified endpoint with form data
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`},
      body: formData,
    });
    if (!res.ok) throw new Error(`Failed to upload file to ${endpoint}`);
    // Parse & return JSON response
    return res.json();
  };

  return { getProtectedData, postProtectedData, postProtectedFile };
};

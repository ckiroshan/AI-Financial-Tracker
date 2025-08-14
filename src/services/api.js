import { API_CONFIG, APP_CONFIG } from '../config/api.js'

// Transaction API service
export const transactionAPI = {
  // Get all transactions
  getTransactions: async () => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transactions`);
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    return response.json();
  },

  // Get transaction by ID
  getTransactionById: async (id) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transactions/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transaction');
    }
    return response.json();
  },

  // Create new transaction
  createTransaction: async (transactionData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transactions`, {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) {
      throw new Error('Failed to create transaction');
    }
    return response.json();
  },

  // Update transaction
  updateTransaction: async (id, transactionData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transactions/${id}`, {
      method: 'PUT',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(transactionData),
    });
    if (!response.ok) {
      throw new Error('Failed to update transaction');
    }
    return response.json();
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete transaction');
    }
    return response.json();
  },
};

# Transactions Page Setup Guide

## Overview
This transactions page is designed to work with your backend API. It provides full CRUD operations for transactions with a modern, mobile-responsive UI.

## Features
- ✅ **View Transactions** - Display all transactions grouped by date
- ✅ **Add Transaction** - Modal form to create new transactions
- ✅ **Edit Transaction** - Update existing transactions
- ✅ **Delete Transaction** - Remove transactions with confirmation
- ✅ **Filter Transactions** - Filter by All, Income, or Expense
- ✅ **Search Transactions** - Search functionality (ready for implementation)
- ✅ **Real-time Totals** - Calculate and display income/expense totals
- ✅ **Mobile Responsive** - Works on all device sizes

## Backend Integration

### API Endpoints Used
The frontend expects these backend endpoints:

```
GET    /api/transactions          - Get all transactions
GET    /api/transactions/:id      - Get transaction by ID
POST   /api/transactions          - Create new transaction
PUT    /api/transactions/:id      - Update transaction
DELETE /api/transactions/:id      - Delete transaction
```

### Transaction Data Structure
The frontend sends/receives data in this format:

```javascript
{
  type: 'income' | 'expense',     // Required
  amount: number,                 // Required, > 0
  note: string,                   // Required
  date: string,                   // Required (YYYY-MM-DD)
  source: string,                 // Required (account name)
  user_id: string,                // Required (ObjectId)
  category_id: string,            // Required (ObjectId)
  receipt_id: string              // Optional (ObjectId)
}
```

## Configuration

### 1. Update API URL
Edit `src/config/api.js` to match your backend URL:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Change this to your backend URL
  // ...
}
```

### 2. Update User ID
Replace the default user ID in `src/config/api.js`:

```javascript
export const APP_CONFIG = {
  DEFAULT_USER_ID: 'your-actual-user-id', // Replace with real user ID
  // ...
}
```

### 3. Categories Setup
Currently using mock categories. You'll need to:

1. Create a categories API endpoint in your backend
2. Update the categories array in `src/pages/TransactionsPage.jsx`
3. Or fetch categories from your backend API

## File Structure

```
src/
├── components/
│   ├── TransactionFormModal.jsx    # Transaction form modal
│   └── ui/                         # UI components
├── config/
│   └── api.js                      # API configuration
├── pages/
│   └── TransactionsPage.jsx        # Main transactions page
├── services/
│   └── api.js                      # API service functions
└── App.jsx                         # Routing setup
```

## Usage

### Starting the Application
```bash
npm run dev
```

### Navigation
- Visit `/transactions` to see the transactions page
- Use the floating "+" button to add new transactions
- Click edit/delete icons on transaction cards for those actions
- Use the filter tabs to view All, Income, or Expense transactions

## Customization

### Styling
- Uses Tailwind CSS for styling
- Colors and themes can be customized in the component files
- Mobile-first responsive design

### Categories
To add/modify categories, update the categories array in `TransactionsPage.jsx`:

```javascript
const categories = [
  { _id: '1', name: 'Food & Dining', icon: Utensils, color: 'bg-orange-500' },
  // Add more categories here
]
```

### Currency
Update currency settings in `src/config/api.js`:

```javascript
export const APP_CONFIG = {
  CURRENCY: 'Rs',        // Currency name
  CURRENCY_SYMBOL: '₹',  // Currency symbol
  // ...
}
```

## Error Handling
- Loading states for API calls
- Error messages for failed operations
- Form validation for required fields
- Confirmation dialogs for destructive actions

## Next Steps
1. **Authentication** - Add user authentication and replace hardcoded user ID
2. **Categories API** - Create backend endpoint for categories
3. **Search** - Implement search functionality
4. **Pagination** - Add pagination for large transaction lists
5. **Receipts** - Integrate receipt upload functionality
6. **Export** - Add export to CSV/PDF functionality

## Troubleshooting

### Common Issues
1. **CORS Errors** - Ensure your backend allows requests from the frontend domain
2. **API URL** - Verify the API URL in `src/config/api.js` matches your backend
3. **User ID** - Replace the default user ID with a valid one from your database
4. **Categories** - Ensure category IDs match those in your backend database

### Development Tips
- Check browser console for API errors
- Use browser dev tools to inspect network requests
- Test with different transaction types (income/expense)
- Verify date formats match your backend expectations

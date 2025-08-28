"use client";

import { useState } from "react";

function TransactionsCategoriesPage() {
  // dummy data
  const [transactions, setTransactions] = useState([
    { id: 1, type: "income", amount: 500, note: "Salary", date: "2025-08-01", source: "Company", category: "Work" },
    { id: 2, type: "expense", amount: 200, note: "Groceries", date: "2025-08-02", source: "Supermarket", category: "Food" },
    { id: 3, type: "expense", amount: 100, note: "Bus Ticket", date: "2025-08-03", source: "Transport", category: "Travel" },
  ]);

  const [categories, setCategories] = useState([
    { id: 1, name: "Food", type: "expense" },
    { id: 2, name: "Travel", type: "expense" },
    { id: 3, name: "Work", type: "income" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transactions</h2>

      {/* Search */}
      <input placeholder="Search transactions..." style={{ marginBottom: "10px", padding: "5px" }} />

      {/* Table */}
      <table border="1" cellPadding="5" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Note</th>
            <th>Date</th>
            <th>Source</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
              <td>{t.note}</td>
              <td>{t.date}</td>
              <td>{t.source}</td>
              <td>{t.category}</td>
              <td>
                <button>Edit</button> <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Transaction */}
      <button onClick={() => setShowForm(true)} style={{ marginTop: "10px" }}>
        Add Transaction
      </button>

      {showForm && (
        <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
          <h3>Transaction Form</h3>
          <input placeholder="Type (income/expense)" /><br />
          <input placeholder="Amount" /><br />
          <input placeholder="Note" /><br />
          <input placeholder="Date" /><br />
          <input placeholder="Source" /><br />
          <input placeholder="Category" /><br />
          <button>Save</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      <h2>Categories</h2>

      {/* Search */}
      <input placeholder="Search categories..." style={{ marginBottom: "10px", padding: "5px" }} />

      {/* Categories Table */}
      <table border="1" cellPadding="5" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.type}</td>
              <td>
                <button>Edit</button> <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Category */}
      <button onClick={() => setShowCategoryForm(true)} style={{ marginTop: "10px" }}>
        Add Category
      </button>

      {showCategoryForm && (
        <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
          <h3>Category Form</h3>
          <input placeholder="Category Name" /><br />
          <input placeholder="Type (income/expense)" /><br />
          <button>Save</button>
          <button onClick={() => setShowCategoryForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default TransactionsCategoriesPage;
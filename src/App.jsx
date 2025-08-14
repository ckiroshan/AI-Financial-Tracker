import { Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./components/layouts/root-layout.page";
import TransactionsPage from "./pages/TransactionsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="budget" element={<div className="p-4">Budget Page</div>} />
          <Route path="profile" element={<div className="p-4">Profile Page</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

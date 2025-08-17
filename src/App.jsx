import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./components/layouts/root-layout.page";
import HomePage from "./pages/home.page";
import Dashboard from "./pages/dashboard.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import ProtectLayout from "./components/layouts/protect.layout";
import { useUser } from "@clerk/clerk-react";

const IndexRouteComponent = () => {
  // Check if user is loaded & signed in
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  if (isSignedIn) return <Navigate to="/user/dashboard" />;
  // If not signed in, return the home page
  return <HomePage />;
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public Routes */}
          <Route index element={<IndexRouteComponent />} />
          {/* Authentication Routes */}
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
          {/* Protected Routes */}
          <Route element={<ProtectLayout />}>
            <Route path="/user/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;

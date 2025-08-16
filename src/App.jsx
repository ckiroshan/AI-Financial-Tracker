import { Route, Routes } from "react-router";
import "./App.css";
import RootLayout from "./components/layouts/root-layout.page";
import HomePage from "./pages/home.page";
import Dashboard from "./pages/dashboard.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Public Routes */}
          <Route index element={
              <>
                <SignedIn><Dashboard /></SignedIn>
                <SignedOut><HomePage /></SignedOut>
              </>
            }
          />
          {/* Signed In Dashboard Route */}
          <Route path="/user/dashboard" element={
              <>
                <SignedIn><Dashboard /></SignedIn>
                <SignedOut><SignInPage /></SignedOut>
              </>
            }
          />
          {/* Authentication Routes */}
          <Route path="login" element={<SignInPage />} />
          <Route path="register" element={<SignUpPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

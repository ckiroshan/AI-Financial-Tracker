
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import Header from "../Header";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default RootLayout;
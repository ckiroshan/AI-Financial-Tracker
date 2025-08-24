import { Outlet } from "react-router-dom";
import BottomNav from "../BottomNav";

function AuthenticatedLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}

export default AuthenticatedLayout;

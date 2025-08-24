import { Link, useLocation } from "react-router-dom";
import { TrendingUp, PieChart, BellDot, ChartNoAxesCombined } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  return (
    <div className="py-5 mb-20">
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-center space-x-6 md:space-x-19 lg:space-x-32 py-2">
          {/* Dashboard Link */}
          <Link to="/user/dashboard" className="flex flex-col items-center p-2">
            {/* Dynamically applies text color based on the current path */}
            <ChartNoAxesCombined className={`w-6 h-6 ${location.pathname === "/user/dashboard" ? "text-green-500" : "text-gray-400"}`} />
            <span className={`text-sm mt-1 font-medium ${location.pathname === "/user/dashboard" ? "text-green-500" : "text-gray-400"}`}>Dashboard</span>
          </Link>
          {/* Transactions Link */}
          <Link to="/user/transactions" className="flex flex-col items-center p-2">
            <TrendingUp className={`w-6 h-6 ${location.pathname === "/user/transactions" ? "text-green-500" : "text-gray-400"}`} />
            <span className={`text-sm mt-1 ${location.pathname === "/user/transactions" ? "text-green-500" : "text-gray-400"}`}>Transactions</span>
          </Link>
          {/* Budget Link */}
          <Link to="/user/budget" className="flex flex-col items-center p-2">
            <PieChart className={`w-6 h-6 ${location.pathname === "/user/budget" ? "text-green-500" : "text-gray-400"}`} />
            <span className={`text-sm mt-1 ${location.pathname === "/user/budget" ? "text-green-500" : "text-gray-400"}`}>Budget</span>
          </Link>
          {/* Notifications Link */}
          <Link to="/user/notifications" className="flex flex-col items-center p-2">
            <BellDot className={`w-6 h-6 ${location.pathname === "/user/notifications" ? "text-green-500" : "text-gray-400"}`} />
            <span className={`text-sm mt-1 ${location.pathname === "/user/notifications" ? "text-green-500" : "text-gray-400"}`}>Notifications</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;

import { MonthYearPicker } from "@/components/transactions/month-year-picker.jsx";
import Notifications from "./../components/notifications/notifications.jsx";
import { useEffect, useState } from "react";

const NotificationsPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate fetch delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="rounded-lg mx-2 md:mx-20 lg:mx-30 my-2 py-4 lg:px-8">
      <div className="mx-2 lg:mx-20">
        {/* Header */}
        <div className="mb-3 lg:mb-1 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <MonthYearPicker />
        </div>
        <p className="text-center mb-2 lg:text-lg">These are your Notifications overview</p>

        {/* Notifications list */}
        <Notifications isLoading={isLoading} />
      </div>
    </div>
  );
};

export default NotificationsPage;

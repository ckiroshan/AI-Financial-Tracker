import { useState } from "react";
import { Activity, AlertTriangle, Bell, CircleX, Clock, X } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

// Dummy reminders for now
const mockNotifications = [
  {
    id: "68e17ae8f59fc08c252c0c32",
    title: "Budget: Social Events reached 100%",
    description: "Your budget for Entertainment has been fully used.",
    dueDate: "2025-10-04T19:52:08.905Z",
    type: "fullLimit",
  },
  {
    id: "68e17ae8f59fc08c252c0c2f",
    title: "Budget: Social Events at 90%",
    description: "Your budget for Entertainment has reached 90% of its limit.",
    dueDate: "2025-10-03T19:52:08.433Z",
    type: "closeLimit",
  },
  {
    id: "68e159776b0f429437f263e2",
    title: "No transactions logged",
    description: "Hey, you haven't logged any transactions in 5 days. Add one today to keep your finances on track!",
    dueDate: "2025-10-01T17:29:27.163Z",
    type: "noTransactions",
  },
  {
    id: "68e14ce7f57fe452937589b6",
    title: "Budget: Social Events at 50%",
    description: "Your budget for Entertainment has reached 50% of its limit.",
    dueDate: "2025-10-02T16:35:51.166Z",
    type: "halfLimit",
  },
];

const Notifications = ({ isLoading }) => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case "noTransactions":
        return <Activity className="h-5 w-5" />;
      case "halfLimit":
      case "closeLimit":
      case "fullLimit":
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getAccent = (type) => {
    switch (type) {
      case "noTransactions":
        return "bg-green-50 text-primary";
      case "halfLimit":
        return "bg-yellow-50 text-yellow-500";
      case "closeLimit":
        return "bg-orange-50 text-orange-600";
      case "fullLimit":
        return "bg-red-50 text-red-600";
      default:
        return "bg-indigo-50 text-indigo-600";
    }
  };

  const getBorder = (type) => {
    switch (type) {
      case "noTransactions":
        return "border-l-6 border-green-500";
      case "halfLimit":
        return "border-l-6 border-yellow-400";
      case "closeLimit":
        return "border-l-6 border-orange-500";
      case "fullLimit":
        return "border-l-6 border-red-500";
      default:
        return "border-l-6 border-indigo-500";
    }
  };

  const formatDueDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-white shadow p-6 flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-70" />
            </div>
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-12 text-center rounded-xl border-2 border-yellow-400 bg-white shadow">
        <Bell className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No notifications</h3>
        <p className="text-sm text-gray-500">You'll see all your finance related reminders here once they’re generated.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((n) => (
        <div key={n.id} className={`relative group rounded-xl border bg-white shadow p-4 flex items-start gap-3 transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${getBorder(n.type)}`}>
          <div className={`p-2 rounded-full ${getAccent(n.type)}`}>{getIcon(n.type)}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 lg:text-lg">{n.title}</h3>
            <p className="text-gray-600 mb-2">{n.description}</p>
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Clock className="h-4 w-4" />
              {formatDueDate(n.dueDate)}
            </div>
          </div>
          <button onClick={() => deleteNotification(n.id)} className="absolute top-2 right-2 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700" title="Delete notification">
            <CircleX className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
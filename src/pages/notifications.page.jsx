import Notifications from "./../components/notifications/notifications.jsx";


const NotificationsPage = () => {
  return (
    <div className="rounded-lg mx-2 md:mx-20 lg:mx-30 my-2 py-4 lg:px-8">
      {/* Header */}
      <div className="px-6 py-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <p className="text-gray-600 text-lg mt-1">These are your Notifications overview</p>
      </div>
      <Notifications />
    </div>
  );
};

export default NotificationsPage;

import { useEffect, useState } from "react";
import {
  fetchNotifications,
  markNotificationAsSeen,
} from "../services/userServices";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userId"); // Get the current user's ID

  // Fetch notifications for the current user
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications(userId);
        setNotifications(data);
      } catch (error) {
        console.error("Error loading notifications:", error);
      }
    };

    loadNotifications();
  }, [userId]);

  // Mark a notification as seen
  const handleMarkAsSeen = async (notificationId) => {
    try {
      await markNotificationAsSeen(notificationId, userId);

      // Update the state to reflect the seen status
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isSeen: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as seen:", error);
    }
  };

  // Filter out notifications that are already read
  const unreadNotifications = notifications.filter(
    (notification) => !notification.isRead
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Notifications</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide">
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((notification) => (
            <div
              key={notification._id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm text-gray-500">{notification.message}</p>
                <p className="text-xs text-gray-400">
                  From: {notification.senderId?.name || "Unknown Sender"}
                </p>
                <p className="text-xs text-gray-400">
                  Task: {notification.taskId?.mealType || "Unknown Task"}
                </p>
              </div>
              <button
                onClick={() => handleMarkAsSeen(notification._id)}
                disabled={notification.isSeen} // Disable the button if the notification is already seen
                className={`px-4 py-2 text-sm text-white bg-gradient-to-br from-[#868CFF] to-[#4318FF] rounded-lg shadow-md hover:shadow-lg transition-shadow ${
                  notification.isSeen ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {notification.isSeen ? "Marked as Seen" : "Mark as Seen"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No unread notifications.</p>
        )}
      </div>
    </div>
  );
}

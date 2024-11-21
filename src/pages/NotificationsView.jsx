import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const NotificationsView = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Fetch notifications when the component mounts
  useEffect(() => {
    getNotifications();
  }, []);

  // Fetch notifications from the API
  const getNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications/');
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Handle reading a notification
  const readNotification = async (notification) => {
    console.log('readNotification', notification.id);

    try {
      const response = await axios.post(`/api/notifications/read/${notification.id}/`);
      console.log(response.data);

      // Navigate based on the notification type
      if (notification.type_of_notification === 'post_like' || notification.type_of_notification === 'post_comment') {
        navigate(`/postview/${notification.post_id}`);
      } else {
        navigate(`/friends/${notification.created_for_id}`);
      }
    } catch (error) {
      console.error('Error reading notification:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-4">
      <div className="main-center col-span-3 space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 bg-white border border-gray-200 rounded-lg"
            >
              {notification.body}
              <button
                className="underline ml-2 text-blue-500"
                onClick={() => readNotification(notification)}
              >
                Read more
              </button>
            </div>
          ))
        ) : (
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            You don't have any unread notifications!
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsView;

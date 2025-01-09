import axios from "axios";


// Fetch the logged-in user's profile
export const getUserProfile = async (id) => {
  
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/users/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update the logged-in user's profile
export const updateUserProfile = async (id, profileData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_URL}/api/users/${id}`,
      profileData
    );
    return response.data; // Ensure the backend returns the updated profile
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const getAllusers = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/api/users/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
}

export const sendNotification = async (userId, message) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/api/users/notify`,
      { userId, message },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to send notification");
    }

    return response.data;
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
};


export const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/users/notifications/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
}

export const markNotificationAsSeen = async (notificationId,userId) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_URL}/api/users/notifications/read`,{userId,notificationId}
    );

    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};
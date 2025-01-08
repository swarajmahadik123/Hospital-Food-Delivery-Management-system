import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // Replace with your backend URL

// Fetch the logged-in user's profile
export const getUserProfile = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Update the logged-in user's profile
export const updateUserProfile = async (id, profileData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, profileData);
    return response.data; // Ensure the backend returns the updated profile
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

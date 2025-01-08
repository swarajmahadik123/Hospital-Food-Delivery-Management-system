import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin"; // Replace with your backend URL

// Fetch all pantry staff
export const getAllPantryStaffUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pantry-staff-users`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new pantry staff member
export const createPantryStaff = async (staffData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/create-pantry-staff`,
      staffData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a single pantry staff member by ID
export const getPantryStaffById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pantry-staff/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a pantry staff member
export const updatePantryStaff = async (id, staffData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/pantry-staff/${id}`,
      staffData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a pantry staff member
export const deletePantryStaff = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/pantry-staff/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Assign a food preparation task
export const assignFoodPreparationTask = async (taskData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/food-preparation-tasks`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch all food preparation tasks
export const getAllFoodPreparationTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/food-preparation-tasks`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAssignedMealTasks = async (userId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/assigned-meal-tasks/${userId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createMealTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/meal-tasks`, taskData);
    return response.data; // { message: "Meal task created successfully.", task: newMealTask }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create meal task."
    );
  }
};

export const getAllMealTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/meal-tasks-all`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch meal tasks.");
  }

}
export const updateMealTaskStatus = async (taskId, newStatus) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/meal-tasks/${taskId}/status`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to update task status.");
  }
};

export const markTaskAsDelivered = async (taskId) => {  
  try {
    const response = await axios.put(`${API_BASE_URL}/meal-tasks/${taskId}/mark-as-delivered`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to mark task as delivered.");
  }
} 
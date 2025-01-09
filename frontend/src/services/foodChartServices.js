import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_URL}/api`; // Replace with your backend URL

// Fetch diet chart by patientId
export const getFoodChartByPatientId = async (patientId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/food-charts/${patientId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch diet chart.");
  }
};

// Create a new diet chart
export const createFoodChart = async (dietChart) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/food-charts`,
      dietChart
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create diet chart.");
  }
};

// Update an existing diet chart
export const updateFoodChart = async (patientId, dietChart) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/admin/food-charts/${patientId}`,
      dietChart
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update diet chart.");
  }
};

// Generate diet chart using Gemini API
export const generateDietChart = async (patientDetails) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/generate-diet-chart`, // Backend route for generating diet chart
      patientDetails
    );
    return response.data; // Returns the generated diet chart
  } catch (error) {
    throw new Error("Failed to generate diet chart.");
  }
};



export const createMealTask = async (taskData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/meal-tasks`,
      taskData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
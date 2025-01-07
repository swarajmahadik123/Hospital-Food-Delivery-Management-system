import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/admin"; // Replace with your backend URL

// Create a new patient
export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/patients`, patientData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get all patients
export const getAllPatients = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get a patient by ID
export const getPatientById = async (patientId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/patients/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a patient
export const updatePatient = async (patientId, patientData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/patients/${patientId}`,
      patientData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a patient
export const deletePatient = async (patientId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/patients/${patientId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

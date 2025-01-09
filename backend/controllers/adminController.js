import Patient from "../models/Patient.js";
import FoodChart from "../models/FoodChart.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import PantryStaff from "../models/PantryDetails.js";
import User from "../models/User.js";
import MealTask from "../models/MealTask.js";

// ==================== Patient Management ====================
export const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== Food Chart Management ====================
// Create a new food chart
export const createFoodChart = async (req, res) => {
  try {
    const { patientId, morningMeal, eveningMeal, nightMeal } = req.body;

    // Check if a food chart already exists for the patient
    const existingFoodChart = await FoodChart.findOne({ patientId });
    if (existingFoodChart) {
      return res
        .status(400)
        .json({ message: "Food chart already exists for this patient." });
    }

    // Create a new food chart
    const newFoodChart = new FoodChart({
      patientId,
      morningMeal,
      eveningMeal,
      nightMeal,
    });

    await newFoodChart.save();
    res.status(201).json(newFoodChart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create food chart.", error: error.message });
  }
};

// Get a food chart by patientId
export const getFoodChartByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const foodChart = await FoodChart.findOne({ patientId });
    if (!foodChart) {
      return res.status(200).json(null); // Return null if no food chart is found
    }

    res.status(200).json(foodChart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch food chart.", error: error.message });
  }
};

// Update a food chart by patientId
export const updateFoodChart = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { morningMeal, eveningMeal, nightMeal } = req.body;

    const updatedFoodChart = await FoodChart.findOneAndUpdate(
      { patientId },
      { morningMeal, eveningMeal, nightMeal },
      { new: true, runValidators: true }
    );

    if (!updatedFoodChart) {
      return res
        .status(404)
        .json({ message: "Food chart not found for this patient." });
    }

    res.status(200).json(updatedFoodChart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update food chart.", error: error.message });
  }
};

// Delete a food chart by patientId
export const deleteFoodChart = async (req, res) => {
  try {
    const { patientId } = req.params;

    const deletedFoodChart = await FoodChart.findOneAndDelete({ patientId });
    if (!deletedFoodChart) {
      return res
        .status(404)
        .json({ message: "Food chart not found for this patient." });
    }

    res.status(200).json({ message: "Food chart deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete food chart.", error: error.message });
  }
};

// Generate a diet char with gemini api

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(`${process.env.GEMINI_API_KEY}`); // Replace with your Gemini API key

export const generateDietChart = async (req, res) => {
  try {
    const { name, age, gender, diseases, allergies } = req.body;

    // Construct the prompt for Gemini
    const prompt = `Generate a personalized diet chart for a patient with the following details:
- Name: ${name}
- Age: ${age}
- Gender: ${gender}
- Diseases: ${diseases.join(", ")}
- Allergies: ${allergies.join(", ")}

The diet chart should include meals for morning, evening, and night. Each meal should have a list of ingredients and instructions. Use the following exact format:

Morning Meal:
- Ingredient 1
- Ingredient 2
- Ingredient 3
Instructions: Step-by-step instructions for the morning meal.

Evening Meal:
- Ingredient 1
- Ingredient 2
- Ingredient 3
Instructions: Step-by-step instructions for the evening meal.

Night Meal:
- Ingredient 1
- Ingredient 2
- Ingredient 3
Instructions: Step-by-step instructions for the night meal.

Do not include any additional sections, notes, or guidelines. Only provide the meals in the exact format specified above.`;

    // Generate response using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const dietChartText = response.text();

    // Parse the response into a structured format
    const dietChart = parseDietChart(dietChartText);

    // Send the structured diet chart to the frontend
    res.status(200).json(dietChart);
  } catch (error) {
    console.error("Error generating diet chart:", error);
    res.status(500).json({ error: "Failed to generate diet chart" });
  }
};

// Helper function to parse the Gemini response into a structured format
const parseDietChart = (text) => {
  const meals = text.split("\n\n"); // Split by double newlines
  const dietChart = {
    morningMeal: {
      ingredients: [],
      instructions: "",
    },
    eveningMeal: {
      ingredients: [],
      instructions: "",
    },
    nightMeal: {
      ingredients: [],
      instructions: "",
    },
  };

  meals.forEach((meal) => {
    if (meal.includes("Morning Meal")) {
      dietChart.morningMeal = extractMealDetails(meal);
    } else if (meal.includes("Evening Meal")) {
      dietChart.eveningMeal = extractMealDetails(meal);
    } else if (meal.includes("Night Meal")) {
      dietChart.nightMeal = extractMealDetails(meal);
    }
  });

  return dietChart;
};

// Helper function to extract meal details
const extractMealDetails = (mealText) => {
  const lines = mealText.split("\n");
  const ingredients = [];
  let instructions = "";

  lines.forEach((line) => {
    if (line.startsWith("- ")) {
      ingredients.push(line.replace("- ", "").trim());
    } else if (line.startsWith("Instructions:")) {
      instructions = line.replace("Instructions:", "").trim();
    }
  });

  return { ingredients, instructions };
};

export const getAllFoodCharts = async (req, res) => {
  try {
    const foodCharts = await FoodChart.find();
    res.status(200).json(foodCharts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food charts" });
  }
};

// Fetch all pantry staff
export const getAllPantryStaff = async (req, res) => {
  try {
    // Fetch all users with the role "pantry_staff"
    const pantryStaff = await User.find({ role: "pantry_staff" });
    res.status(200).json(pantryStaff);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch pantry staff" });
  }
};

// Fetch single pantry staff by ID
export const createPantryStaff = async (req, res) => {
  const { user, contactInfo, location } = req.body;
  try {
    // Validate that the user exists and has role "pantry_staff"
    const userDoc = await User.findById(user);
    if (!userDoc || userDoc.role !== "pantry_staff") {
      return res.status(400).json({ error: "Invalid user or role" });
    }
    const newStaff = await PantryStaff.create({
      user,
      contactInfo,
      location,
    });
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPantryStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the pantry staff by ID
    const pantryStaff = await User.findById(id);
    if (!pantryStaff) {
      return res.status(404).json({ error: "Pantry staff not found" });
    }
    res.status(200).json(pantryStaff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllPantryStaffUsers = async (req, res) => {
  try {
    const staffUsers = await User.find({ role: "pantry_staff" });
    res.status(200).json(staffUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pantry staff users" });
  }
};

// Import the MealTask model

export const createMealTask = async (req, res) => {
  try {
    // Extract fields from the request body
    const { patientId, mealType, assignedTo } = req.body;

    // Validate required fields
    if (!patientId || !mealType || !assignedTo) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new meal task
    const newMealTask = new MealTask({
      patientId,
      mealType,
      assignedTo,
      preparationStatus: "pending", // Default value
      deliveryStatus: "pending", // Default value
    });

    // Save the meal task to the database
    await newMealTask.save();

    // Return success response
    res.status(201).json({
      message: "Meal task created successfully.",
      task: newMealTask,
    });
  } catch (error) {
    console.error("Error creating meal task:", error);
    res
      .status(500)
      .json({ message: error.message || "Failed to create meal task." });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await MealTask.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const markAsDelivered = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the meal task by ID
    const task = await MealTask.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the delivery status to "delivered"
    task.deliveryStatus = "delivered";

    // Save the updated task
    await task.save();

    res.status(200).json({ message: "Task marked as delivered" });
  } catch (error) {
    console.error("Error marking task as delivered:", error);
    res.status(500).json({ message: "Failed to mark task as delivered" });
  }
};

export const getAssignedMealTasks = async (req, res) => {
  try {
    const { id } = req.params;

    // Find all meal tasks assigned to the user

    const tasks = await MealTask.find({ assignedTo: id });

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching assigned meal tasks:", error);
    res.status(500).json({ message: "Failed to fetch assigned meal tasks" });
  }
};

export const markTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find the meal task by ID
    const task = await MealTask.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the preparation status
    task.preparationStatus = status;

    // Save the updated task
    await task.save();

    res.status(200).json({ message: "Task status updated" });
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Failed to update task status" });
  }
};

export const getAllPreparedTasks = async (req, res) => {
  try {
    const tasks = await MealTask.find({ preparationStatus: "prepared" });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const assignDeliveryPersonel = async (req, res) => {
  const { taskId } = req.params;
  const { deliveryPersonId } = req.body;
  console.log("assignDeliveryPersonel", deliveryPersonId);
  try {
    const updatedTask = await MealTask.findByIdAndUpdate(
      taskId,
      {
        deliveryPersonnelId: deliveryPersonId,
        deliveryStatus: "out_for_delivery",
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Meal task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error assigning delivery personnel:", error);
    res.status(500).json({ message: "Failed to assign delivery personnel" });
  }
};

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAssignedMealTasks,
  updateMealTaskStatus,
} from "../../../services/pantryStaffService";
import { getPatientById } from "../../../services/patientServices";
import { getFoodChartByPatientId } from "../../../services/foodChartServices";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Utensils,
  User,
  Bed,
  AlertCircle,
} from "lucide-react";

const statusColors = {
  prepared: "#22c55e", // green-500
  pending: "#eab308", // yellow-500
  delayed: "#ef4444", // red-500
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const ManageFoodPreparationSection = () => {
  const [mealTasks, setMealTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [dietChart, setDietChart] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchAssignedMealTasks = async () => {
      setIsLoading(true);
      try {
        const tasks = await getAssignedMealTasks(userId);
        setMealTasks(tasks);
        setError("");
      } catch (error) {
        console.error("Failed to fetch meal tasks:", error);
        setError("Failed to fetch meal tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignedMealTasks();
  }, [userId]);

  useEffect(() => {
    const fetchPatientAndDietChart = async () => {
      if (selectedTask) {
        setIsLoading(true);
        try {
          const patient = await getPatientById(selectedTask.patientId);
          setPatientDetails(patient);

          const dietChart = await getFoodChartByPatientId(
            selectedTask.patientId
          );
          setDietChart(dietChart);
        } catch (error) {
          console.error("Failed to fetch patient or diet chart:", error);
          setError("Failed to fetch patient or diet chart. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchPatientAndDietChart();
  }, [selectedTask]);

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await updateMealTaskStatus(taskId, newStatus);
      setMealTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, preparationStatus: newStatus } : task
        )
      );
      setError("");
    } catch (error) {
      console.error("Failed to update task status:", error);
      setError("Failed to update task status. Please try again.");
    }
  };

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDetails = () => {
    setSelectedTask(null);
    setPatientDetails(null);
    setDietChart(null);
  };

  const getMealDetails = (mealType) => {
    if (!dietChart) return null;

    switch (mealType.toLowerCase()) {
      case "morning":
        return dietChart.morningMeal;
      case "evening":
        return dietChart.eveningMeal;
      case "night":
        return dietChart.nightMeal;
      default:
        return null;
    }
  };

  const getStatusInfo = (status) => {
    switch (status.toLowerCase()) {
      case "prepared":
        return {
          color: statusColors.prepared,
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "pending":
        return {
          color: statusColors.pending,
          icon: <Clock className="w-4 h-4" />,
        };
      case "delayed":
        return {
          color: statusColors.delayed,
          icon: <AlertCircle className="w-4 h-4" />,
        };
      default:
        return { color: "#9ca3af", icon: <Clock className="w-4 h-4" /> };
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Food Preparation
      </h2>

      {isLoading && (
        <motion.p {...fadeInUp} className="text-gray-500">
          Loading meal tasks...
        </motion.p>
      )}

      {error && (
        <motion.p {...fadeInUp} className="text-red-600 mb-4">
          {error}
        </motion.p>
      )}

      <AnimatePresence mode="wait">
        {selectedTask ? (
          <motion.div
            key="details"
            {...fadeInUp}
            className="flex flex-col md:flex-row gap-6"
          >
            <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
              <button
                onClick={handleCloseDetails}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#4318FF]" />
                <span>Back</span>
              </button>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Task Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-[#4318FF]" />
                  <p>
                    <strong>Meal Type:</strong> {selectedTask.mealType}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-[#4318FF]" />
                  <p>
                    <strong>Patient Name:</strong>{" "}
                    {patientDetails?.name || "Loading..."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#4318FF]" />
                  <p>
                    <strong>Room Number:</strong>{" "}
                    {patientDetails?.roomNumber || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Diet Chart
              </h3>
              <div className="space-y-4">
                {dietChart ? (
                  <>
                    <p>
                      <strong>Ingredients:</strong>
                    </p>
                    <ul className="list-disc pl-6">
                      {getMealDetails(selectedTask.mealType)?.ingredients.map(
                        (ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        )
                      )}
                    </ul>
                    <p>
                      <strong>Instructions:</strong>{" "}
                      {getMealDetails(selectedTask.mealType)?.instructions}
                    </p>
                  </>
                ) : (
                  <p>Loading diet chart...</p>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="list" {...fadeInUp} className="space-y-4">
            {mealTasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.98 }}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="font-medium text-gray-800">
                      Meal Type: {task.mealType}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: getStatusInfo(task.preparationStatus)
                            .color,
                        }}
                      />
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        Status: {task.preparationStatus}
                        {getStatusInfo(task.preparationStatus).icon}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleUpdateStatus(task._id, "prepared")}
                      disabled={task.preparationStatus === "prepared"} // Disable if prepared
                      className={`px-4 py-2 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-lg transition-opacity text-sm ${
                        task.preparationStatus === "prepared"
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:opacity-90"
                      }`}
                    >
                      Mark as Prepared
                    </button>
                    <button
                      onClick={() => handleViewDetails(task)}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageFoodPreparationSection;
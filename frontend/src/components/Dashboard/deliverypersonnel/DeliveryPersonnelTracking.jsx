import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Truck, User, Clipboard } from "lucide-react";
import {
  getAllPreparedMealTasks,
  markTaskAsDelivered,
} from "../../../services/pantryStaffService";
import { getPatientById } from "../../../services/patientServices";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function DeliveryPersonnelTracking() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks and filter for the logged-in delivery personnel
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const allTasks = await getAllPreparedMealTasks();
        const userId = localStorage.getItem("userId");

        // Filter tasks assigned to the logged-in delivery personnel
        const filteredTasks = allTasks.filter(
          (task) => task.deliveryPersonnelId === userId
        );

        // Fetch patient details for each task
        const tasksWithPatientDetails = await Promise.all(
          filteredTasks.map(async (task) => {
            const patient = await getPatientById(task.patientId);
            return { ...task, patient };
          })
        );

        setTasks(tasksWithPatientDetails);
        setError("");
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Mark a task as delivered
  const handleMarkAsDelivered = async (taskId) => {
    try {
      const updatedTask = await markTaskAsDelivered(taskId);

      // Update the task in the state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, deliveryStatus: "delivered" } : task
        )
      );

      setError("");
    } catch (error) {
      console.error("Error marking task as delivered:", error);
      setError("Failed to mark task as delivered. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="p-6 bg-gray-50 rounded-lg shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Delivery Personnel Tracking
      </h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned to you.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Task Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="font-medium">Patient Name:</span>
                      <span className="ml-2">{task.patient.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Clipboard className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="font-medium">Room Number:</span>
                      <span className="ml-2">{task.patient.roomNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-3 text-gray-500" />
                      <span className="font-medium">Meal Type:</span>
                      <span className="ml-2">{task.mealType}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      task.deliveryStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : task.deliveryStatus === "out_for_delivery"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.deliveryStatus}
                  </span>
                  {/* Show "Mark as Delivered" button for tasks that are out for delivery */}
                  {task.deliveryStatus === "out_for_delivery" && (
                    <button
                      onClick={() => handleMarkAsDelivered(task._id)}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Mark as Delivered
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

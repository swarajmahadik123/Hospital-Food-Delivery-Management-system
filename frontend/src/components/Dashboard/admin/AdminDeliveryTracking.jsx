import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getPatientById } from "../../../services/patientServices";
import {
  getAllMealTasks,
  getPantryStaffById,
} from "../../../services/pantryStaffService";
import { Loader2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function AdminDeliveryTracking() {
  const [tasks, setTasks] = useState([]); // State to store all meal tasks
  const [taskDetails, setTaskDetails] = useState([]); // State to store enriched task details
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all meal tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      setError("");

      try {
        const tasks = await getAllMealTasks(); // Fetch all meal tasks
        setTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch meal tasks:", error);
        setError("Failed to fetch meal tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Fetch additional details for each task (patient and pantry staff)
  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (tasks.length > 0) {
        setIsLoading(true);
        setError("");

        try {
          const details = await Promise.all(
            tasks.map(async (task) => {
              const patient = await getPatientById(task.patientId);
              const pantryStaff = await getPantryStaffById(task.assignedTo);
              return {
                ...task,
                patientName: patient.name,
                roomNumber: patient.roomNumber,
                assignedToName: pantryStaff.name,
              };
            })
          );

          setTaskDetails(details);
        } catch (error) {
          console.error("Failed to fetch task details:", error);
          setError("Failed to fetch task details. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchTaskDetails();
  }, [tasks]);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Delivery Tracking
      </h2>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 text-[#4318FF] animate-spin" />
          <span className="ml-2 text-gray-600">Loading task details...</span>
        </div>
      )}

      {error && (
        <p className="text-red-600 mb-4 p-3 bg-red-100 rounded-lg">{error}</p>
      )}

      {!isLoading && !error && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Meal Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {taskDetails.map((task) => (
                <motion.tr
                  key={task._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.roomNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {task.mealType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.assignedToName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        task.deliveryStatus === "delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {task.deliveryStatus}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

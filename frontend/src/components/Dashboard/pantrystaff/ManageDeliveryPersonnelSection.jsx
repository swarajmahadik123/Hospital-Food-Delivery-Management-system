import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Clipboard, Truck, ArrowLeft } from "lucide-react";
import { getPatientById } from "../../../services/patientServices";
import {
  assignDeliveryPerson,
  getAllPreparedMealTasks,
} from "../../../services/pantryStaffService";
import { getAllDeliveryPersonnel } from "../../../services/pantryStaffService";

export default function ManageDeliveryPersonnelSection() {
  const [preparedMealTasks, setPreparedMealTasks] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch prepared meal tasks and delivery personnel
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [tasks, personnel] = await Promise.all([
          getAllPreparedMealTasks(),
          getAllDeliveryPersonnel(),
        ]);
        setPreparedMealTasks(tasks);
        console.log(personnel);
        setDeliveryPersonnel(personnel);
        setError("");
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch patient details when a task is selected
  useEffect(() => {
    if (selectedTask) {
      const fetchPatientDetails = async () => {
        try {
          const patient = await getPatientById(selectedTask.patientId);
          setPatientDetails(patient);
        } catch (error) {
          console.error("Error fetching patient details:", error);
          setError("Failed to fetch patient details. Please try again.");
        }
      };

      fetchPatientDetails();
    }
  }, [selectedTask]);

  // Assign delivery personnel to a meal task
  const handleAssignDeliveryPerson = async (taskId, personnelId) => {
    try {
      const updatedTask = await assignDeliveryPerson(taskId, personnelId);
      setPreparedMealTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setSelectedTask(null); // Return to the task list after assignment
    } catch (error) {
      console.error("Error assigning delivery personnel:", error);
      setError("Failed to assign delivery personnel. Please try again.");
    }
  };

  // Check if the task is assignable (not "out_for_delivery" or "delivered")
  const isTaskAssignable = (task) => {
    return (
      task.deliveryStatus !== "out_for_delivery" &&
      task.deliveryStatus !== "delivered"
    );
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Pantry Staff Dashboard
      </h2>

      {error && (
        <div className="mb-6 p-3 bg-red-100 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedTask ? (
          // Task Details Section
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-sm"
          >
            <button
              onClick={() => setSelectedTask(null)}
              className="flex items-center mb-6 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Task List
            </button>

            <div className="flex gap-6">
              {/* Left Block: Patient Details */}
              <div className="w-1/2">
                <h3 className="text-xl font-semibold mb-4">Patient Details</h3>
                <div className="space-y-4">
                  {patientDetails ? (
                    <>
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">Patient Name:</span>
                        <span className="ml-2">{patientDetails.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Clipboard className="w-5 h-5 mr-3 text-gray-500" />
                        <span className="font-medium">Room Number:</span>
                        <span className="ml-2">
                          {patientDetails.roomNumber}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p>Loading patient details...</p>
                  )}
                </div>
              </div>

              {/* Right Block: Assign Delivery Personnel (only for assignable tasks) */}
              {isTaskAssignable(selectedTask) && (
                <div className="w-1/2">
                  <h3 className="text-xl font-semibold mb-4">
                    Assign Delivery Personnel
                  </h3>
                  <div className="space-y-3">
                    {deliveryPersonnel.map((person) => (
                      <div
                        key={person._id}
                        className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Truck className="w-5 h-5 mr-3 text-gray-500" />
                          <span>{person.name}</span>
                        </div>
                        <button
                          onClick={() =>
                            handleAssignDeliveryPerson(
                              selectedTask._id,
                              person._id
                            )
                          }
                          disabled={!isTaskAssignable(selectedTask)} // Disable if not assignable
                          className={`px-4 py-2 ${
                            !isTaskAssignable(selectedTask)
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          } text-white rounded-lg`}
                        >
                          {!isTaskAssignable(selectedTask)
                            ? "Assigned"
                            : "Assign"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          // Task List Section
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold p-6 text-gray-700">
              Prepared Meal Boxes
            </h3>
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Task</th>
                  <th className="p-3 text-left">Meal Type</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {preparedMealTasks.map((task, index) => (
                  <tr
                    key={task._id}
                    onClick={() => setSelectedTask(task)}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-3">Task {index + 1}</td>
                    <td className="p-3">{task.mealType}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          task.deliveryStatus === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.deliveryStatus === "out_for_delivery"
                            ? "bg-yellow-100 text-yellow-700" // Yellow for "out_for_delivery"
                            : "bg-green-100 text-green-700" // Green for "delivered"
                        }`}
                      >
                        {task.deliveryStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

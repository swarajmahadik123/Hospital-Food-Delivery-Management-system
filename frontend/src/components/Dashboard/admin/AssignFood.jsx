import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createMealTask,
  getAllMealTasks,
} from "../../../services/pantryStaffService";
import { ChevronDown, Plus } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function AssignFood({
  patients,
  allStaff,
  onAssign,
  isLoading,
}) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      try {
        const tasks = await getAllMealTasks();
        setAssignedTasks(tasks);
      } catch (error) {
        console.error("Failed to fetch assigned tasks:", error);
      }
    };

    fetchAssignedTasks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedPatient || !selectedMealType || !selectedAssignedTo) {
      onAssign("All fields are required.", true);
      return;
    }

    const taskData = {
      patientId: selectedPatient,
      mealType: selectedMealType,
      assignedTo: selectedAssignedTo,
    };

    try {
      const result = await createMealTask(taskData);
      onAssign(result.message);

      setSelectedPatient("");
      setSelectedMealType("");
      setSelectedAssignedTo("");

      const updatedTasks = await getAllMealTasks();
      setAssignedTasks(updatedTasks);
    } catch (error) {
      onAssign(
        error.message || "Failed to assign task. Please try again.",
        true
      );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Assign Food Preparation Tasks
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <select
            name="patientId"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent appearance-none transition-shadow"
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            name="mealType"
            value={selectedMealType}
            onChange={(e) => setSelectedMealType(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent appearance-none transition-shadow"
          >
            <option value="">Select Meal Type</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
            <option value="night">Night</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            name="assignedTo"
            value={selectedAssignedTo}
            onChange={(e) => setSelectedAssignedTo(e.target.value)}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent appearance-none transition-shadow"
          >
            <option value="">Select Staff Member</option>
            {allStaff.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <Plus className="w-5 h-5" />
          {isLoading ? "Assigning..." : "Assign Task"}
        </motion.button>
      </form>

      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Assigned Food Preparation Tasks
        </h4>
        <AnimatePresence>
          {assignedTasks.length > 0 ? (
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
              className="bg-white rounded-lg shadow overflow-hidden"
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meal Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignedTasks.map((task) => (
                    <motion.tr
                      key={task._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patients.find((p) => p._id === task.patientId)?.name ||
                          "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {task.mealType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {allStaff.find((s) => s._id === task.assignedTo)
                          ?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {task.preparationStatus}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.p
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fadeInUp}
              className="text-gray-500 text-center py-4"
            >
              No tasks assigned yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

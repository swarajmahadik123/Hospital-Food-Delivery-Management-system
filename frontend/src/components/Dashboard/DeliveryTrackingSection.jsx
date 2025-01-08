import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  getAllMealTasks,
  markTaskAsDelivered,
} from "../services/pantryStaffService";
import AdminDeliveryTracking from "./AdminDeliveryTracking";
import PantryStaffDeliveryTracking from "./PantryStaffDeliveryTracking";
import DeliveryPersonnelTracking from "./DeliveryPersonnelTracking";
import { Loader2 } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function DeliveryTrackingSection({ userType }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const data = await getAllMealTasks();
        setTasks(data);
        setError("");
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setError("Failed to fetch tasks. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleMarkAsDelivered = async (taskId) => {
    try {
      await markTaskAsDelivered(taskId);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, deliveryStatus: "delivered" } : task
        )
      );
      setError("");
    } catch (error) {
      console.error("Failed to mark task as delivered:", error);
      setError("Failed to mark task as delivered. Please try again.");
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Delivery Tracking
      </h2>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-8"
          >
            <Loader2 className="w-8 h-8 text-[#4318FF] animate-spin" />
            <span className="ml-2 text-gray-600">Loading tasks...</span>
          </motion.div>
        )}

        {error && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-600 mb-4 p-3 bg-red-100 rounded-lg"
          >
            {error}
          </motion.p>
        )}

        {!isLoading && !error && (
          <motion.div
            key="content"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fadeInUp}
          >
            {userType === "admin" && <AdminDeliveryTracking tasks={tasks} />}
            {userType === "pantry_staff" && <PantryStaffDeliveryTracking />}
            {userType === "delivery_personnel" && (
              <DeliveryPersonnelTracking
                tasks={tasks}
                handleMarkAsDelivered={handleMarkAsDelivered}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

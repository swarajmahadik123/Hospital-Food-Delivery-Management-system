import { motion } from "framer-motion";
import { Check } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function DeliveryPersonnelTracking({
  tasks,
  handleMarkAsDelivered,
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
    >
      <p className="text-lg text-gray-700 mb-4">
        Delivery Personnel: Mark deliveries as completed.
      </p>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Meal Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tasks
              .filter((task) => task.assignedTo === "delivery_personnel_id")
              .map((task) => (
                <motion.tr
                  key={task._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {task.patientId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                    {task.mealType}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleMarkAsDelivered(task._id)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-lg hover:opacity-90 transition-opacity"
                      disabled={task.deliveryStatus === "delivered"}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark as Delivered
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";

export default function DeliveryTrackingSection({ userType }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Delivery Tracking</h2>
      <div className="space-y-4">
        {userType === "admin" && (
          <p>Admin: View all deliveries and their statuses.</p>
        )}
        {userType === "pantry_staff" && (
          <p>Pantry Staff: Assign meal boxes to delivery personnel.</p>
        )}
        {userType === "delivery_personnel" && (
          <p>Delivery Personnel: Mark deliveries as completed.</p>
        )}
      </div>
    </motion.div>
  );
}

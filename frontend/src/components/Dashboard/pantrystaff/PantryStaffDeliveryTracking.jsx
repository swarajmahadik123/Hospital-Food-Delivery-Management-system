import { motion } from "framer-motion";

export default function PantryStaffDeliveryTracking() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <p>Pantry Staff: Assign meal boxes to delivery personnel.</p>
      {/* Add form or logic for assigning meal boxes here */}
    </motion.div>
  );
}

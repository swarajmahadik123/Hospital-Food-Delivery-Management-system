import { motion } from "framer-motion";

export default function PantrySection() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-lg font-semibold mb-4">Pantry Management</h2>
      <div className="space-y-4">
        {/* Add pantry management content here */}
      </div>
    </motion.div>
  );
}
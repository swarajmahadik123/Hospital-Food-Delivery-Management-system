import { motion } from "framer-motion";
import { StatsCard } from "../StatCard";
import { Users, Utensils, ShoppingBasket } from "lucide-react";

export default function DashboardSection() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Patients"
          value="324"
          icon={<Users className="h-6 w-6 text-[#4318FF]" />}
          delay={0.1}
        />
        <StatsCard
          title="Meals Prepared Today"
          value="892"
          icon={<Utensils className="h-6 w-6 text-[#4318FF]" />}
          delay={0.2}
        />
        <StatsCard
          title="Pantry Items"
          value="156"
          icon={<ShoppingBasket className="h-6 w-6 text-[#4318FF]" />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Diet Charts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">Patient #{item}001</p>
                  <p className="text-sm text-gray-500">Diabetic Diet</p>
                </div>
                <span className="text-[#4318FF] cursor-pointer">
                  View Details
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Low Stock Items</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">Item #{item}</p>
                  <p className="text-sm text-gray-500">5 units remaining</p>
                </div>
                <button className="px-4 py-2 text-sm text-white bg-gradient-to-br from-[#868CFF] to-[#4318FF] rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  Restock
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

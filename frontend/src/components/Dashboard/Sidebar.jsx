import { motion } from "framer-motion";
import {
  Users,
  ClipboardList,
  CookingPot,
  LayoutDashboard,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Patient Details",
    icon: Users,
    path: "/patients",
  },
  {
    title: "Diet Charts",
    icon: ClipboardList,
    path: "/diet-charts",
  },
  {
    title: "Pantry Management",
    icon: CookingPot,
    path: "/pantry",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("/dashboard");

  const handleNavigation = (path) => {
    setActiveItem(path);
    // You can add your routing logic here
    // history.push(path) if using react-router
  };

  return (
    <div className="h-screen w-64 bg-white shadow-xl p-6">
      <div className="flex items-center gap-2 mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CookingPot className="h-8 w-8 text-[#4318FF]" />
        </motion.div>
        <h1 className="text-xl font-bold text-gray-800">MediFood</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeItem === item.path
                  ? "bg-gradient-to-br from-[#868CFF] to-[#4318FF] text-white shadow-lg shadow-[#4318FF]/30"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </button>
          </motion.div>
        ))}
      </nav>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-6"
      >
        <button className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  Users,
  ClipboardList,
  CookingPot,
  LayoutDashboard,
  UserCircle,
  Truck,
  LogOut,
} from "lucide-react";
import { useState } from "react";

// Menu items for Admin
const adminMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    section: "dashboard",
  },
  {
    title: "Patient Details",
    icon: Users,
    section: "patients",
  },
  {
    title: "Diet Charts",
    icon: ClipboardList,
    section: "diet-charts",
  },
  {
    title: "Pantry Management",
    icon: CookingPot,
    section: "pantry",
  },
  {
    title: "Delivery Tracking",
    icon: Truck,
    section: "delivery-tracking",
  },
  {
    title: "Profile",
    icon: UserCircle,
    section: "profile",
  },
];

// Menu items for Pantry Staff
const pantryStaffMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    section: "dashboard",
  },
  {
    title: "Pantry Management",
    icon: CookingPot,
    section: "pantry",
  },
  {
    title: "Delivery Tracking",
    icon: Truck,
    section: "delivery-tracking",
  },
  {
    title: "Profile",
    icon: UserCircle,
    section: "profile",
  },
];

// Menu items for Delivery Personnel
const deliveryPersonnelMenuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    section: "dashboard",
  },
  {
    title: "Delivery Tracking",
    icon: Truck,
    section: "delivery-tracking",
  },
  {
    title: "Profile",
    icon: UserCircle,
    section: "profile",
  },
];
const handleLogOut = () => {
  //remove the cookie and user type from local storage
  localStorage.removeItem("userType");
  localStorage.removeItem("token");

  //redirect to login page
  window.location.href = "/login";
};

export function Sidebar({ onSelectSection, userType }) {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Get menu items based on user type
  const getMenuItems = () => {
    switch (userType) {
      case "admin":
        return adminMenuItems;
      case "pantry_staff":
        return pantryStaffMenuItems;
      case "delivery_personnel":
        return deliveryPersonnelMenuItems;
      default:
        return [];
    }
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
    onSelectSection(section);
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
        {getMenuItems().map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => handleNavigation(item.section)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.section
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
        <button
          onClick={handleLogOut}
          className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </motion.div>
    </div>
  );
}

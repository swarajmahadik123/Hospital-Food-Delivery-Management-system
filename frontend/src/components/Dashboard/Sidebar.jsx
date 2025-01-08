import { motion } from "framer-motion";
import {
  Users,
  ClipboardList,
  CookingPot,
  LayoutDashboard,
  UserCircle,
  Truck,
  LogOut,
  ListChecks,
  UserPlus,
  PackageCheck,
} from "lucide-react";
import { useState } from "react";

// Menu items for Admin
const adminMenuItems = [
  {
    title: "Profile",
    icon: UserCircle,
    section: "profile",
  },
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
];

// Menu items for Pantry Staff
const pantryStaffMenuItems = [
  {
    title: "Profile",
    icon: UserCircle,
    section: "profile",
  },
  {
    title: "Manage Food Preparation",
    icon: CookingPot,
    section: "manage-food-preparation",
  },
  {
    title: "Manage Delivery Personnel",
    icon: UserPlus,
    section: "manage-delivery-personnel",
  },
  {
    title: "Track Meal Deliveries",
    icon: Truck,
    section: "track-meal-deliveries",
  },
];

// Menu items for Delivery Personnel
const deliveryPersonnelMenuItems = [
  {
    title: "Profile",
    icon: UserCircle,
    section: "profile",
  },
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
];

const handleLogOut = () => {
  // Remove the cookie and user type from local storage
  localStorage.removeItem("userType");
  localStorage.removeItem("userId");
  localStorage.removeItem("token");

  // Redirect to login page
  window.location.href = "/login";
};

export function Sidebar({ onSelectSection, userType }) {
  // Set the initial active section to "profile"
  const [activeSection, setActiveSection] = useState("profile");

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

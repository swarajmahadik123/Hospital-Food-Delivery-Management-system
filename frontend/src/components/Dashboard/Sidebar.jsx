import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ClipboardList,
  CookingPot,
  LayoutDashboard,
  UserCircle,
  Truck,
  LogOut,
  UserPlus,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Menu, X } from "lucide-react"; // Import hamburger and close icons

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
    title: "Notifications",
    icon: Bell, // Add a bell icon for notifications
    section: "notifications",
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
    title: "Delivery Tracking",
    icon: Truck,
    section: "delivery-tracking-delivery-personnel",
  },
  {
    title: "Notifications",
    icon: Bell, // Add a bell icon for notifications
    section: "notifications",
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
  const [activeSection, setActiveSection] = useState("profile");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
  const navigate = useNavigate(); // useNavigate should be used inside the component

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
    setIsSidebarOpen(false); // Close sidebar after navigation on mobile
  };

  return (
    <>
      {/* Hamburger Menu Button (Mobile Only) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg lg:hidden"
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{
          x: isSidebarOpen || window.innerWidth >= 1024 ? 0 : "-100%", // Always visible on desktop
        }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed lg:static h-screen w-64 bg-white shadow-xl p-6 z-50"
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 mb-8"
        >
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
      </motion.div>
    </>
  );
}

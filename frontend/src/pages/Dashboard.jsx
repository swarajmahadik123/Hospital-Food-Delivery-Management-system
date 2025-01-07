import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../components/Dashboard/Sidebar";
import DashboardSection from "../components/Dashboard/admin/DashboardSection";
import PatientsSection from "../components/Dashboard/admin/PatientsSection";
import DietChartsSection from "../components/Dashboard/admin/DietChartsSection";
import PantrySection from "../components/Dashboard/admin/PantrySection";
import DeliveryTrackingSection from "../components/Dashboard/pantrystaff/DeliveryTrackingSection";
import ProfileSection from "../components/Dashboard/ProfileSection";
import { UserContext } from "../context/userContext";

export default function Dashboard() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Retrieve the user type from local storage
    const storedUserType = localStorage.getItem("userType");
    
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);
  
  const [selectedSection, setSelectedSection] = useState("dashboard");

  // Render the selected section based on user type
  const renderSection = () => {
    switch (selectedSection) {
      case "dashboard":
        return <DashboardSection userType={userType} />;
      case "patients":
        return <PatientsSection userType={userType} />;
      case "diet-charts":
        return <DietChartsSection userType={userType} />;
      case "pantry":
        return <PantrySection userType={userType} />;
      case "delivery-tracking":
        return <DeliveryTrackingSection userType={userType} />;
      case "profile":
        return <ProfileSection userType={userType} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onSelectSection={setSelectedSection} userType={userType} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold mb-8"
          >
            {selectedSection === "dashboard"
              ? "Dashboard Overview"
              : selectedSection.charAt(0).toUpperCase() +
                selectedSection.slice(1)}
          </motion.h1>

          {/* Render the selected section */}
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

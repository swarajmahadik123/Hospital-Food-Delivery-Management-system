import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "../components/Dashboard/Sidebar";
import DashboardSection from "../components/Dashboard/admin/DashboardSection";
import PatientsSection from "../components/Dashboard/admin/PatientsSection";
import DietChartSection from "../components/Dashboard/admin/DietChartsSection";
import PantrySection from "../components/Dashboard/admin/PantrySection";
import AdminDeliveryTrackingSection from "../components/Dashboard/admin/AdminDeliveryTracking";

import ManageFoodPreparationSection from "../components/Dashboard/pantrystaff/ManageFoodPreparationSection";
import ManageDeliveryPersonnelSection from "../components/Dashboard/pantrystaff/ManageDeliveryPersonnelSection";
import DeliveryPersonnelTracking from "../components/Dashboard/deliverypersonnel/DeliveryPersonnelTracking";
import ProfileSection from "../components/Dashboard/ProfileSection";
import Notifications from "../components/Notification";

export default function Dashboard() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    // Retrieve the user type from local storage
    const storedUserType = localStorage.getItem("userType");

    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const [selectedSection, setSelectedSection] = useState("profile");

  // Render the selected section based on user type
  const renderSection = () => {
    switch (selectedSection) {
      case "profile":
        return <ProfileSection />;

      // Admin Sections
      case "dashboard":
        return userType === "admin" ? <DashboardSection /> : null;
      case "patients":
        return userType === "admin" ? <PatientsSection /> : null;
      case "diet-charts":
        return userType === "admin" ? <DietChartSection /> : null;
      case "pantry":
        return userType === "admin" ? <PantrySection /> : null;
      case "delivery-tracking":
        return userType === "admin" ? <AdminDeliveryTrackingSection /> : null;

      // Pantry Staff Sections
      case "manage-food-preparation":
        return userType === "pantry_staff" ? (
          <ManageFoodPreparationSection />
        ) : null;
      case "manage-delivery-personnel":
        return userType === "pantry_staff" ? (
          <ManageDeliveryPersonnelSection />
        ) : null;

      // Delivery Personnel Sections
      case "delivery-tracking-delivery-personnel":
        return userType === "delivery_personnel" ? (
          <DeliveryPersonnelTracking />
        ) : null;
      case "notifications":
        return <Notifications />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onSelectSection={setSelectedSection} userType={userType} />

      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
         

          {/* Render the selected section */}
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

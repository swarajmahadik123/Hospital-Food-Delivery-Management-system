import { useState } from "react";
import { motion } from "framer-motion";
import { createPantryStaff } from "../../../services/pantryStaffService";
import { ChevronDown, Save } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function InputPantry({ allStaff, onSave, isLoading }) {
  const [pantryDetails, setPantryDetails] = useState({
    staffId: "",
    contactInfo: "",
    location: "",
  });

  const handlePantryDetailsChange = (e) => {
    const { name, value } = e.target;
    setPantryDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePantryDetails = (details) => {
    return details.staffId && details.contactInfo && details.location;
  };

  const handleSavePantryDetails = async () => {
    if (!validatePantryDetails(pantryDetails)) {
      onSave("All fields are required.", true);
      return;
    }

    const data = {
      user: pantryDetails.staffId,
      contactInfo: pantryDetails.contactInfo,
      location: pantryDetails.location,
    };

    try {
      await createPantryStaff(data);
      onSave("Pantry details saved successfully.");
      setPantryDetails({
        staffId: "",
        contactInfo: "",
        location: "",
      });
    } catch (error) {
      onSave("Failed to save pantry details. Please try again.", true);
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      className="space-y-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Pantry Details
      </h3>
      <div className="space-y-4">
        <div className="relative">
          <select
            name="staffId"
            value={pantryDetails.staffId}
            onChange={handlePantryDetailsChange}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent appearance-none transition-shadow"
          >
            <option value="">Select Staff Member</option>
            {allStaff.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <input
          type="text"
          name="contactInfo"
          value={pantryDetails.contactInfo}
          onChange={handlePantryDetailsChange}
          placeholder="Contact Info"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent transition-shadow"
        />
        <div className="relative">
          <select
            name="location"
            value={pantryDetails.location}
            onChange={handlePantryDetailsChange}
            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4318FF] focus:border-transparent appearance-none transition-shadow"
          >
            <option value="">Select Location</option>
            <option value="Main Kitchen">Main Kitchen</option>
            <option value="Ward 5 Kitchen">Ward 5 Kitchen</option>
            <option value="Cafeteria Storage">Cafeteria Storage</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
        <motion.button
          onClick={handleSavePantryDetails}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-[#868CFF] to-[#4318FF] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          {isLoading ? "Saving..." : "Save Details"}
        </motion.button>
      </div>
    </motion.div>
  );
}
